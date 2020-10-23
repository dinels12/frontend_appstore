import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Button,
  Input,
  TextareaAutosize,
  Modal,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import { Edit, Save, CloudUpload } from "@material-ui/icons";
import { development, production } from "../../env";
const web = process.env.NODE_ENV === "production" ? production : development;

export default class EditProduct extends Component {
  state = {
    show: false,
    title: "",
    description: "",
    message: "Guardar",
    imageURL:
      "https://res.cloudinary.com/dinels/image/upload/c_scale,h_300,w_250/v1603020508/notFoundImageDefault.jpg",
    uploading: false,
    file: "",
  };

  handleClose = () => {
    this.setState({ show: false, title: "", description: "" });
  };

  handleShow = () => {
    this.setState({
      show: true,
      title: this.props.product.title,
      description: this.props.product.description,
      _id: this.props.product._id,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  imageLoad = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  updateProduct = async (e) => {
    e.preventDefault();
    const r = window.confirm("Seguro que quieres actualizar el producto?");
    if (r) {
      this.setState({
        uploading: true,
      });
      const token = Cookies.get("jwt");
      const { title, description, file, _id } = this.state;
      let formData = new FormData();
      formData.append("_id", _id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);

      axios
        .post(`${web}/company/product/update`, formData, {
          headers: { "Content-Type": "multipart/form-data", token },
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err.response.data.message));
    }
  };

  render() {
    const { show, title, description, message, imageURL } = this.state;
    const {
      handleClose,
      handleShow,
      updateProduct,
      onChange,
      imageLoad,
    } = this;
    return (
      <>
        <Button color='primary' onClick={handleShow} startIcon={<Edit />}>
          Editar
        </Button>

        <Modal open={show} onClose={handleClose}>
          <Card style={{ maxWidth: 365 }} className='ml-auto mr-auto mt-5'>
            <CardActionArea>
              <CardMedia
                component='img'
                alt={description}
                height='140'
                image={imageURL}
                title={title}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  <Input
                    placeholder='Nombre'
                    defaultValue={title}
                    name='title'
                    className='mr-2'
                    onChange={onChange}
                  />
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='div'
                >
                  <TextareaAutosize
                    placeholder='Descripcion del producto'
                    defaultValue={description}
                    name='description'
                    onChange={onChange}
                  />
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Input
                accept='image/*'
                id='contained-button-file'
                name='image'
                style={{ display: "none" }}
                onChange={imageLoad}
                type='file'
              />
              <label htmlFor='contained-button-file'>
                <Button
                  variant='contained'
                  color='primary'
                  component='span'
                  startIcon={<CloudUpload />}
                >
                  Imagen
                </Button>
              </label>
              <label>
                <Button
                  onClick={updateProduct}
                  variant='contained'
                  color='primary'
                  startIcon={<Save />}
                >
                  {message}
                </Button>
              </label>
            </CardActions>
          </Card>
        </Modal>
      </>
    );
  }
}
