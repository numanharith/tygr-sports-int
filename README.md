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
One key takeaway here is that react state can't be updated in the async function createProfile. I initially tried:
```jsx
const [imageUrl, setImageUrl] = useState('');

...

  .then(({ url }) => setImageUrl(url)
  .catch((err) => console.log(err));
axios.post('/api/profile/me', { height, weight, bio, imageUrl })
```
and my _imageUrl_ value did not update in time before the axios post request sends the variables to my backend.
