import numpy as np
import requests
import tensorflow as tf
import tensorflow_hub as hub
from tensorflow import keras
from flask_jwt_extended import JWTManager, create_access_token
import bcrypt
import datetime
from flask_cors import CORS
from flask import Flask, request, jsonify, session
from bson.objectid import ObjectId 
app = Flask(__name__)
jwt = JWTManager(app)
CORS(app)

# Configuration
app.config["SECRET_KEY"] = "your_secret_key"  # Replace with a strong secret key

SECURITY_SERVER_URL = "http://localhost:5001"
# In-memory databases
users_db = {}
products_db = {}
admins_db = {}


def reset_databases():
    global users_db, products_db, admins_db
    users_db = {}
    products_db = {}
    admins_db = {}

# Call the reset function when the app starts
reset_databases()

# User API
@app.route("/userRegister", methods=['POST'])
def userRegister():
    data = request.json
    email = data.get('email')
    username = data.get('username')
    phone = data.get('phone')
    password = data.get('password')
    cpassword = data.get('cpassword')

    if not all([email, username, phone, password, cpassword]):
        return jsonify(message='Missing fields'), 400

    if email in users_db:
        return jsonify(message='Email already exists'), 401
    if any(user['username'] == username for user in users_db.values()):
        return jsonify(message='Username already exists'), 401
    if any(user['phone'] == phone for user in users_db.values()):
        return jsonify(message='Phone Number already exists'), 401

    if password != cpassword:
        return jsonify(message='Password Not Matching!'), 401

    hashpw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    access_token = create_access_token(identity=email)
    users_db[email] = {
        'email': email,
        'password': hashpw,
        'username': username,
        'phone': phone,
        'tokens': [{'token': str(access_token)}],
        'cartProducts': [],
        'orders': []
    }

    session['email'] = email
    return jsonify(token=str(access_token)), 201

@app.route("/userLogin", methods=['POST'])
def userLogin():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify(message='Missing fields'), 400

    user = users_db.get(email)

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        access_token = create_access_token(identity=email)
        user['tokens'].append({'token': str(access_token)})
        return jsonify(token=str(access_token)), 201

    return jsonify(message='Invalid Username/Password'), 401

@app.route("/getUserData", methods=['POST'])
def getUserData():
    auth_token = request.json.get('auth')
    if not auth_token:
        return jsonify(message='Missing authentication token'), 400

    for user in users_db.values():
        if any(token['token'] == auth_token for token in user['tokens']):
            user_data = user.copy()
            user_data.pop('password', None)  # Exclude password from response
            return jsonify(user_data), 201

    return jsonify(message='Invalid or expired token'), 401

@app.route("/addtoCart", methods=['PUT'])
def addtoCart():
    data = request.json
    uid = data.get('uid')
    newCartProd = data.get('product')

    if not all([uid, newCartProd]):
        return jsonify(message='Missing fields'), 400

    user = users_db.get(uid)
    if user and any(prod['pid'] == newCartProd['pid'] for prod in user['cartProducts']):
        return jsonify(message='Product Already Added!'), 401

    user['cartProducts'].append(newCartProd)
    return jsonify(message='Product Added Successfully!'), 201

@app.route("/removefromCart", methods=['PUT'])
def removefromCart():
    data = request.json
    uid = data.get('uid')
    cid = data.get('cid')

    if not all([uid, cid]):
        return jsonify(message='Missing fields'), 400

    user = users_db.get(uid)
    if user:
        user['cartProducts'] = [prod for prod in user['cartProducts'] if str(prod['_id']) != cid]
        return jsonify(message='Product Removed Successfully!'), 201

    return jsonify(message='Something went wrong!'), 401

@app.route("/deleteOrder", methods=['PUT'])
def deleteOrder():
    data = request.json
    uid = data.get('uid')
    oid = data.get('oid')

    if not all([uid, oid]):
        return jsonify(message='Missing fields'), 400

    user = users_db.get(uid)
    if user:
        user['orders'] = [order for order in user['orders'] if str(order['_id']) != oid]
        return jsonify(message='Order Cancelled Successfully!'), 201

    return jsonify(message='Something went wrong!'), 401

@app.route("/userOrders", methods=['PUT'])
def userOrders():
    data = request.json
    uid = data.get('uid')
    newOrder = data.get('order')

    if not all([uid, newOrder]):
        return jsonify(message='Missing fields'), 400

    user = users_db.get(uid)
    if user and any(order['pid'] == newOrder['pid'] for order in user['orders']):
        return jsonify(message='Order already Placed'), 401

    user['orders'].append(newOrder)
    return jsonify(message='Order Placed Successfully!'), 201

@app.route("/logoutUser", methods=['POST'])
def logoutUser():
    auth_token = request.json.get('auth')
    if not auth_token:
        return jsonify(message='Missing authentication token'), 400

    for user in users_db.values():
        if any(token['token'] == auth_token for token in user['tokens']):
            user['tokens'] = [token for token in user['tokens'] if token['token'] != auth_token]
            return jsonify(message='Logout Successfully!'), 201

    return jsonify(message='Invalid or expired token!'), 401



# Products API
@app.route("/getAllProducts", methods=['GET'])
def getAllProducts():
    return jsonify(list(products_db.values())), 201

@app.route("/addComments", methods=['POST'])
def addComments():
    data = request.json
    comment = data.get('comment')
    uid = data.get('uid')
    pid = data.get('pid')

    if not all([comment, uid, pid]):
        return jsonify(message='Missing fields'), 400

    date = datetime.datetime.now()

    try:
        model = keras.models.load_model('sentimentAnalysis.h5', custom_objects={'KerasLayer': hub.KerasLayer})
        pred = model.predict([comment])[0][0]
        sentiment = 1 if pred >= 0.5 else 0

        product = products_db.get(pid)
        if product:
            product.setdefault('comments', []).append({
                '_id': str(ObjectId()),
                'uid': uid,
                'username': users_db[uid]['username'],
                'comment': comment,
                'sentiment': sentiment,
                'date': str(date)
            })
            return jsonify(message='Thanks for your Feedback!'), 201

    except Exception as e:
        print(e)
        return jsonify(message='Something went Wrong!'), 401

@app.route("/addRating", methods=['POST'])
def addRating():
    data = request.json
    rating = data.get('rating')
    pid = data.get('pid')

    if not all([rating, pid]):
        return jsonify(message='Missing fields'), 400

    product = products_db.get(pid)
    if product:
        prev_rating = product.get('rating', 0)
        new_rating = round((prev_rating + rating) / 2, 1)
        product['rating'] = new_rating
        return jsonify(message='Thanks for Rating!'), 201

    return jsonify(message='Something went wrong!'), 401

# Admin API
@app.route("/adminRegister", methods=['POST'])
def adminRegister():
    data = request.json
    email = data.get('email')
    companyName = data.get('companyName')
    phone = data.get('phone')
    password = data.get('password')
    cpassword = data.get('cpassword')

    if not all([email, companyName, phone, password, cpassword]):
        return jsonify(message='Missing fields'), 400

    if email in admins_db:
        return jsonify(message='Email already exists'), 401
    if any(admin['companyName'] == companyName for admin in admins_db.values()):
        return jsonify(message='Company Name already exists'), 401
    if any(admin['phone'] == phone for admin in admins_db.values()):
        return jsonify(message='Phone Number already exists'), 401

    if password != cpassword:
        return jsonify(message='Password Not Matching!'), 401

    hashpw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    access_token = create_access_token(identity=email)
    admins_db[email] = {
        'email': email,
        'companyName': companyName,
        'phone': phone,
        'password': hashpw,
        'tokens': [{'token': str(access_token)}],
        'products': []
    }

    return jsonify(token=str(access_token)), 201

@app.route("/adminLogin", methods=['POST'])
def adminLogin():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify(message='Missing fields'), 400

    admin = admins_db.get(email)
    if admin and bcrypt.checkpw(password.encode('utf-8'), admin['password'].encode('utf-8')):
        access_token = create_access_token(identity=email)
        admin['tokens'].append({'token': str(access_token)})
        # security_response = requests.post(f"{SECURITY_SERVER_URL}/api/security/login", json={'email': email, 'password': password})
        return jsonify(token=str(access_token)), 201

    return jsonify(message='Invalid Username/Password'), 401

@app.route("/getAdminData", methods=['POST'])
def getAdminData():
    auth_token = request.json.get('auth')
    if not auth_token:
        return jsonify(message='Missing authentication token'), 400

    for admin_id, admin in admins_db.items():
        if any(token['token'] == auth_token for token in admin['tokens']):
            admin_data = admin.copy()
            admin_data.pop('tokens', None)  # Exclude tokens from response
            return jsonify(admin_data), 200

    return jsonify(message='Invalid or expired token'), 401

@app.route("/addProduct", methods=['POST'])
def addProduct():
    data = request.json
    adminId = data.get('adminId')
    productName = data.get('productName')
    productPrice = data.get('productPrice')
    productUrl = data.get('productUrl')
    productCategory = data.get('productCategory')

    if not all([adminId, productName, productPrice, productUrl, productCategory]):
        return jsonify(message='Missing fields'), 400

    admin = admins_db.get(adminId)
    if admin:
        product_id = str(ObjectId())
        new_product = {
            '_id': product_id,
            'productName': productName,
            'productPrice': productPrice,
            'productUrl': productUrl,
            'productCategory': productCategory,
            'comments': [],
            'rating': 0
        }
        products_db[product_id] = new_product
        admin['products'].append(new_product)
        return jsonify(message='Product Added Successfully!'), 201

    return jsonify(message='Admin not found!'), 401
@app.route("/addProduct", methods=['POST'])
def addProduct():
    data = request.json
    adminId = data.get('adminId')
    productName = data.get('productName')
    productPrice = data.get('productPrice')
    productUrl = data.get('productUrl')
    productCategory = data.get('productCategory')

    # Check for missing fields
    if not all([adminId, productName, productPrice, productUrl, productCategory]):
        return jsonify(message='Missing fields'), 400

    # Verify if admin exists
    admin = admins_db.get(adminId)
    if admin:
        # Create a new product
        product_id = str(ObjectId())
        new_product = {
            '_id': product_id,
            'productName': productName,
            'productPrice': productPrice,
            'productUrl': productUrl,
            'productCategory': productCategory,
            'comments': [],
            'rating': 0
        }
        
        # Add product to the products_db
        products_db[product_id] = new_product
        
        # Append the new product to the admin's products list
        if 'products' not in admin:
            admin['products'] = []
        admin['products'].append(new_product)
        
        return jsonify(message='Product Added Successfully!'), 201

    return jsonify(message='Admin not found!'), 401

if __name__ == "__main__":
    app.run(debug=True)
