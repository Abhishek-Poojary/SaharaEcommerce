# SaharaEcommerce
![image](https://user-images.githubusercontent.com/101885586/165220593-e9a9424d-55bc-4d8f-9a9e-795e4a3cdd1e.png)
### Sahara is a MERN-based Ecommerce Application which uses redux for state management.



## Features:

### For user:-
<ul>
	<li>Login</li>
	<li>Register</li>
	<li>View/Edit Profile</li>
	<li>Update Password</li>
	<li>View/Edit Cart</li>
	<li>Order Product</li>
	<li>View All Orders</li>
	<li>Add Product to Cart</li>
	<li>Search Products</li>
	<li>Logout</li>
</ul>
  

### For Admin DashBoard:-
<ul>
<li>	Product DashBoard 
    <ul>
		  <li>Add Product </li>
		 <li>  delete Product
    </ul>
 </li>
<li>	User DashBoard
    <ul>
	 <li>	  delete User </li>
	 <li>	  update User Role </li>
    </ul>
  </li>
<li>	Order DashBoard
    <ul>
		   <li>Update Order Status</li>
		  <li> View Order Details</li>
    </ul>
  </li>
</ul>
		

## Screenshots
![image](https://user-images.githubusercontent.com/101885586/165222717-010908c9-ff06-4494-9db6-53ac0e017c87.png)

### Products Page

![image](https://user-images.githubusercontent.com/101885586/165221263-6b538e1d-2090-4f3e-bace-8e3548d1fe31.png)

### Product Detail Page

![image](https://user-images.githubusercontent.com/101885586/165221323-a84b10a7-8780-4360-9973-a3658a0f198f.png)

### My Cart

![image](https://user-images.githubusercontent.com/101885586/165221444-320ee0b0-648f-4a60-b759-91c360e4fa30.png)

### Order Confirmation Page

![image](https://user-images.githubusercontent.com/101885586/165221480-b2b2059e-0cc9-42e7-b685-ed422c9dfe11.png)

### All Orders

![image](https://user-images.githubusercontent.com/101885586/165221629-fbf8d1db-ab98-43d6-acf7-5082aca151b1.png)

### User DashBoard Admin

![image](https://user-images.githubusercontent.com/101885586/165221702-0c4076b0-1f7f-4a41-a96d-f6ac147d2820.png)

### User Profile

![image](https://user-images.githubusercontent.com/101885586/165221728-9b5827f1-b641-4314-a536-61dee738c46b.png)

### Change Password

![image](https://user-images.githubusercontent.com/101885586/165221760-20309295-a1b8-4ce1-b7d9-3a04e39c8f39.png)

### Product DashBoard

![image](https://user-images.githubusercontent.com/101885586/165221837-211d6a00-5727-4054-8cb2-ca37904aa165.png)

	
## Installation GuideLines

### STEP 1
```sh
git clone https://github.com/Abhishek-Poojary/SaharaEcommerce.git
```

### STEP 2
Run npm install inside Sahara-backend and sahara-frontend for node_modules
```sh
npm i 
```

### STEP 3
create a .env file inside sahara-backend and add the below mentioned env variables and values in it
```sh
PORT=4000
JSONWEBTOKEN_KEY=FKJBNFLDLDNLSBNFLBDLBFLDBLVFKVDJSWDLO // change this according to you
JSONWEBTOKEN_EXPIRE=3d
COOKIE_EXPIRES=1
CLOUD_NAME=
CLOUD_KEY=
CLOUD_SECRET=
```

### ClOUD_NAME,CLOUD_KEY,CLOUD_SECRET- create a account in cloudinary and update the values in .env

### STEP 4
open 2 terminals
on first terminal run the following cmds in sequence
```sh
	cd sahara-backend
	npm run nodemon
```
on second terminal run the following cmds in sequence
```sh
	cd sahara-frontend
	npm start
```


## Author : Abhishek Poojary

## Connect with me 
[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-Profile-informational?style=flat&logo=linkedin&logoColor=white&color=0D76A8)](https://www.linkedin.com/in/abhishek-poojary-a46bb5189/)
