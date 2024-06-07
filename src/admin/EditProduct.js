import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import { modules } from "../components/moduleToolbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../pages/axiosInstance";
// import axiosInstance from "../pages/axiosInstance";

const validationSchema = yup.object({
  title: yup
    .string("Add a product title")
    .min(1)
    .required("Product title is required"),
  content: yup
    .string("Add text content")
    .min(1)
    .required("Text content is required"),
    price: yup.number("Add text content"),
    brand: yup.string("Add text content"),
  feature3: yup.string("Add text content"),
  feature4: yup.string("Add text content"),
  feature5: yup.string("Add text content"),
  feature6: yup.string("Add text content"),
  feature7: yup.string("Add text content"),
  feature8: yup.string("Add text content"),
  feature9: yup.string("Add text content"),
  feature10: yup.string("Add text content"),
  techSpec1: yup.string("Add text content"),
  techSpec2: yup.string("Add text content"),
  techSpec3: yup.string("Add text content"),
  techSpec4: yup.string("Add text content"),
  techSpec5: yup.string("Add text content"),
  techSpec6: yup.string("Add text content"),
  techSpec7: yup.string("Add text content"),
  techSpec8: yup.string("Add text content"),
  techSpec9: yup.string("Add text content"),
  techSpec10: yup.string("Add text content"),
  techSpec11: yup.string("Add text content"),
  techSpec12: yup.string("Add text content"),
});

const EditProduct = () => {
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      content: "",
      price: "",
      brand: "",
      feature3: "",
      feature4: "",
      feature5: "",
      feature6: "",
      feature7: "",
      feature8: "",
      feature9: "",
      feature10: "",
      techSpec1: "",
      techSpec2: "",
      techSpec3: "",
      techSpec4: "",
      techSpec5: "",
      techSpec6: "",
      techSpec7: "",
      techSpec8: "",
      techSpec9: "",
      techSpec10: "",
      techSpec11: "",
      techSpec12: "",
      image: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      updateProduct(values);
      actions.resetForm();
    },
  });

  // Show product by Id
  const singleProductById = async () => {
    try {
      // 
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/product/${id}`);
      const product = data.product;
      setFieldValue("title", product.title);
      setFieldValue("content", product.content);
      setFieldValue("price", product.price);
      setFieldValue("brand", product.brand);
      setFieldValue("feature3", product.feature3);
      setFieldValue("feature4", product.feature4);
      setFieldValue("feature5", product.feature5);
      setFieldValue("feature6", product.feature6);
      setFieldValue("feature7", product.feature7);
      setFieldValue("feature8", product.feature8);
      setFieldValue("feature9", product.feature9);
      setFieldValue("feature10", product.feature10);
      setFieldValue("techSpec1", product.techSpec1);
      setFieldValue("techSpec2", product.techSpec2);
      setFieldValue("techSpec3", product.techSpec3);
      setFieldValue("techSpec4", product.techSpec4);
      setFieldValue("techSpec5", product.techSpec5);
      setFieldValue("techSpec6", product.techSpec6);
      setFieldValue("techSpec7", product.techSpec7);
      setFieldValue("techSpec8", product.techSpec8);
      setFieldValue("techSpec9", product.techSpec9);
      setFieldValue("techSpec10", product.techSpec10);
      setFieldValue("techSpec11", product.techSpec11);
      setFieldValue("techSpec12", product.techSpec12);
      setImagePreview(product.image.url);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    singleProductById();
  }, []);

  const updateProduct = async (values) => {
    try {
      const { data } = await axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/update/product/${id}`, values);
      if (data.success === true) {
        toast.success("Product updated");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <Box sx={{ bgColor: "white", padding: "20px 200px" }}>
        <Typography variant="h5" sx={{ pb: 4 }}>
          Edit product
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="title"
            label="Product title"
            name="title"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Product title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />

          <Box sx={{ mb: 3 }}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="content"
              label="Content"
              name="content"
              multiline
              rows={4}
              placeholder="Write the product content..."
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.content && Boolean(errors.content)}
              helperText={touched.content && errors.content}
            />
          </Box>

          <TextField
            fullWidth
            id="price"
            label="price "
            name="price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
          />

          <TextField
            fullWidth
            id="brand"
            label="Brand"
            name="brand"
            className="my-3"
            value={values.brand}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.brand && Boolean(errors.brand)}
            helperText={touched.brand && errors.brand}
          />
          {/* <TextField
            fullWidth
            id="feature3"
            label="feature 3"
            name="feature3"
            value={values.feature3}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.feature3 && Boolean(errors.feature3)}
            helperText={touched.feature3 && errors.feature3}
          />
          <TextField
            fullWidth
            id="feature4"
            label="Feature 4"
            name="feature4"
            value={values.feature4}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.feature4 && Boolean(errors.feature4)}
            helperText={touched.feature4 && errors.feature4}
          />
          <TextField
            fullWidth
            id="feature5"
            label="Feature 5"
            name="feature5"
            value={values.feature5}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.feature5 && Boolean(errors.feature5)}
            helperText={touched.feature5 && errors.feature5}
          />
          <TextField
            fullWidth
            id="feature6"
            label="Feature 6"
            name="feature6"
            value={values.feature6}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.feature6 && Boolean(errors.feature6)}
            helperText={touched.feature6 && errors.feature6}
          />
          <TextField
            fullWidth
            id="feature7"
            label="Feature 7"
            name="feature7"
            value={values.feature7}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.feature7 && Boolean(errors.feature7)}
            helperText={touched.feature7 && errors.feature7}
          />
          <TextField
            fullWidth
            id="feature8"
            label="Feature 8"
            name="feature8"
            value={values.feature8}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.feature8 && Boolean(errors.feature8)}
            helperText={touched.feature8 && errors.feature8}
          />
          <TextField
            fullWidth
            id="feature9"
            label="Feature 9"
            name="feature9"
            value={values.feature9}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.feature9 && Boolean(errors.feature9)}
            helperText={touched.feature9 && errors.feature9}
          />
          <TextField
            fullWidth
            id="feature10"
            label="Feature 10"
            name="feature10"
            value={values.feature10}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.feature10 && Boolean(errors.feature10)}
            helperText={touched.feature10 && errors.feature10}
          /> */}

          {/* Add the remaining TextField components for features 2-10 here */}

          {/* <TextField
            fullWidth
            id="techSpec1"
            label="Technical Spec 1"
            name="techSpec1"
            value={values.techSpec1}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.techSpec1 && Boolean(errors.techSpec1)}
            helperText={touched.techSpec1 && errors.techSpec1}
          />
          <TextField
            fullWidth
            id="techSpec2"
            label="Technical Spec 2"
            name="techSpec2"
            value={values.techSpec2}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.techSpec2 && Boolean(errors.techSpec2)}
            helperText={touched.techSpec2 && errors.techSpec2}
          />

          <TextField
            fullWidth
            id="techSpec3"
            label="Technical Spec 3"
            name="techSpec3"
            value={values.techSpec3}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.techSpec3 && Boolean(errors.techSpec3)}
            helperText={touched.techSpec3 && errors.techSpec3}
          />
          <TextField
            fullWidth
            id="techSpec3"
            label="Technical Spec 4"
            name="techSpec3"
            value={values.techSpec3}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.techSpec3 && Boolean(errors.techSpec3)}
            helperText={touched.techSpec3 && errors.techSpec3}
          />
          <TextField
            fullWidth
            id="techSpec4"
            label="Technical Spec 4"
            name="techSpec4"
            value={values.techSpec4}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.techSpec4 && Boolean(errors.techSpec4)}
            helperText={touched.techSpec4 && errors.techSpec4}
          />
          <TextField
            fullWidth
            id="techSpec5"
            label="Technical Spec 5"
            name="techSpec5"
            value={values.techSpec5}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.techSpec5 && Boolean(errors.techSpec5)}
            helperText={touched.techSpec5 && errors.techSpec5}
          />
          <TextField
            fullWidth
            id="techSpec6"
            label="Technical Spec 6"
            name="techSpec6"
            value={values.techSpec6}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.techSpec6 && Boolean(errors.techSpec6)}
            helperText={touched.techSpec6 && errors.techSpec6}
          />
          <TextField
            fullWidth
            id="techSpec7"
            label="Technical Spec 7"
            name="techSpec7"
            value={values.techSpec7}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.techSpec7 && Boolean(errors.techSpec7)}
            helperText={touched.techSpec7 && errors.techSpec7}
          />
          <TextField
            fullWidth
            id="techSpec8"
            label="Technical Spec 8"
            name="techSpec8"
            value={values.techSpec8}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.techSpec8 && Boolean(errors.techSpec8)}
            helperText={touched.techSpec8 && errors.techSpec8}
          />
          <TextField
            fullWidth
            id="techSpec9"
            label="Technical Spec 9"
            name="techSpec9"
            value={values.techSpec9}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.techSpec9 && Boolean(errors.techSpec9)}
            helperText={touched.techSpec9 && errors.techSpec9}
          />
          <TextField
            fullWidth
            id="techSpec10"
            label="Technical Spec 10"
            name="techSpec10"
            value={values.techSpec10}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.techSpec10 && Boolean(errors.techSpec10)}
            helperText={touched.techSpec10 && errors.techSpec10}
          />
          <TextField
            fullWidth
            id="techSpec11"
            label="Technical Spec 11"
            name="techSpec11"
            value={values.techSpec11}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.techSpec11 && Boolean(errors.techSpec11)}
            helperText={touched.techSpec11 && errors.techSpec11}
          />
          <TextField
            fullWidth
            id="techSpec12"
            label="Technical Spec 12"
            name="techSpec12"
            value={values.techSpec12}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.techSpec12 && Boolean(errors.techSpec12)}
            helperText={touched.techSpec12 && errors.techSpec12}
          /> */}

          {/* Add the remaining TextField components for technical specifications 2-12 here */}

          <Box border="2px dashed blue" sx={{ p: 1 }}>
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) =>
                acceptedFiles.map((file, index) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = () => {
                    setFieldValue("image", reader.result);
                  };
                })
              }
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p style={{ textAlign: "center" }}>
                    <CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} />
                  </p>
                  <p style={{ textAlign: "center", fontSize: "12px" }}>
                    Drag and Drop image here or click to choose
                  </p>
                </div>
              )}
            </Dropzone>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            elevation={0}
            sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
          >
            Update product
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EditProduct;
