# [TygrSports Football Booking](https://tygr-sports.herokuapp.com/)

## Technologies
  * Deployment: Heroku
###### Frontend
  * ReactJS
  * Cloudinary
  * Design: [React Boostrap](https://react-bootstrap.github.io/)
  * Time & date formatter: [momentjs](https://momentjs.com/)
###### Backend
  * NodeJS
  * ExpressJS
  * Password encryption: [bcryptjs](https://www.npmjs.com/package/bcryptjs)
  * JWT validation: [express-jwt](https://www.npmjs.com/package/express-jwt)
  * Object-modeller: mongoose
  * Database: MongoDB (NoSQL)
  
## Database Modelling
<img width="648" alt="Screenshot 2021-06-11 at 11 02 00 PM" src="https://user-images.githubusercontent.com/25051776/121707393-173dc380-cb09-11eb-980e-839d7a0e11d9.png">

## Wireframing
![Screenshot 2021-06-11 at 11 05 16 PM](https://user-images.githubusercontent.com/25051776/121707770-7f8ca500-cb09-11eb-845b-52e3e586cd1c.png)
[Wireframe Miro Link](https://miro.com/app/board/o9J_l_qfkss=/)

## Cloudinary

##### E.g. In my CreateProfileForm.jsx, within the same functional component
```jsx
const [image, setImage] = useState('');

const createProfile = async (e) => {
  e.preventDefault();
    try {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'dpcju0f7');
      data.append('cloud_name', 'dxnyuudyt');

      await fetch('https://api.cloudinary.com/v1_1/dxnyuudyt/image/upload', { method: 'post', body: data })
        .then((res) => res.json())
        .then(({ url }) => axios.post('/api/profile/me', { height, weight, bio, url }))
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
};

...

<Form.Group>
  <Form.Label>Avatar</Form.Label>
  <Form.File onChange={(e) => setImage(e.target.files[0])}></Form.File>
</Form.Group>
```
When the profile is submitted or saved, the image will be posted to my Cloudinary API URL using the fetch request, which will then return the following response below:

![Screenshot 2021-06-12 at 9 48 01 AM](https://user-images.githubusercontent.com/25051776/121761676-c4452a00-cb63-11eb-9067-f6ac024c5572.png)

Since I only need the URL, I deconstructed it from the object and then upload it to my database as shown in the axios post request above.


One key takeaway was that react state can't be updated in the async function createProfile. I initially tried:
```jsx
const [imageUrl, setImageUrl] = useState('');

...

  .then(({ url }) => setImageUrl(url)
  .catch((err) => console.log(err));
axios.post('/api/profile/me', { height, weight, bio, imageUrl })
```
and my _imageUrl_ value did not update in time before the axios post request sends the variables to my backend.

## Installation on localhost
### Packages
##### On root directory
```
npm i axios bootstrap moment react react-dom react-router-dom react-router-bootstrap react-bootstrap
```
##### In client directory
```
npm i bcryptjs body-parser cookie-parser cors dotenv express express-jwt express validator jsonwebtoken mongoose path config
```
### Create a .env file in the root directory
##### Indicate your JWT secret key and MongoDB cluster connection string
```
JWT_SECRET=
MONGODB_URI=
```

## Challenges
### Data handling in NoSQL
##### E.g. Admin deletes a Pitch
```javascript
router.delete('/delete/:pitchId', async (req, res) => {
  try {
    const pitchId = req.params.pitchId;

    // Get all bookingIds that ref the pitchId
    const bookingsId = await Booking.find({ pitch: pitchId }).select('_id');
    const bookingsIdArray = bookingsId.map((bookingId) => bookingId._id);

    // Pulls bookingId (that ref the pitchId) from every users' Profile bookings array
    await Profile.updateMany({}, { $pull: { bookings: { $in: bookingsIdArray } } }, { multi: true });

    // Pulls all bookings from Booking model that ref the pitchId
    await Booking.deleteMany({ pitch: pitchId }, { multi: true });

    // Deletes pitch from Pitch model
    await Pitch.findByIdAndDelete(pitchId);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
```
When the admin deleted a pitch, I had to manually remove the pitch references in the other two models (Profile, Booking) as shown above. In a SQL database, the related data would automatically be deleted in cascade.

## Future Improvements
### DRY
##### E.g. Repeated lines of code in my express routers
```javascript
const token = req.cookies.token;
if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' });
const verified = jwt.verify(token, process.env.JWT_SECRET);
```
I need to find out how to return the value of _verified_ through the middleware shown below.
```javascript
// Allows only logged in user
const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' });
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = verified.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: 'Unauthorized' });
  }
};
```

## References
  * [MERN Stack Authentication using express-jwt](https://youtube.com/playlist?list=PLJM1tXwlGdaf57oUx0rIqSW668Rpo_7oU)
  * [Implementing Cloudinary with MERN Stack](https://youtu.be/uP568vOaBbQ)
