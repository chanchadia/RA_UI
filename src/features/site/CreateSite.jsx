import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomH2 from '../../ui-component/Headings/CustomH2';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import SuccessAlert from '../../ui-component/snackbar';
import { Form, Formik } from 'formik';
import * as Yup from "yup";

import Grid from '@mui/material/GridLegacy';

import CustomTextInput from "../../ui-component/CustomTextInputField/customTextInput";
import Controls from "../../ui-component/Controls/Controls";
import CustomDashedBorder from '../../ui-component/CustomDashedBorder';
import { createSite } from '../../slice/SiteSlice';
import { useNavigate } from 'react-router-dom';

const CreateSite = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successAlert, setsuccessAlert] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
        message: "",
        isError: false,
        handleClose: () => {
            setsuccessAlert({ ...successAlert, open: false, message: "", isError: false });
        }
    });

    const initialValues = {
        id: "0",
        name: "",
        business: "",
        address: "",
        spoc_name: "",
        spoc_email: "",
        active: "Y"
    };

    const validationSchema = Yup.object({
        name: Yup.string().max(255, "Must be 255 characters or less").required("Site Name is mandatory. *"),
        business: Yup.string().max(255, "Must be 255 characters or less").required("Business is mandatory. *"),
        address: Yup.string().max(255, "Must be 255 characters or less").required("Address is mandatory. *"),
        spoc_name: Yup.string().max(255, "Must be 255 characters or less").required("SPOC Name is mandatory. *"),
        spoc_email: Yup.string().max(255, "Must be 255 characters or less").required("SPOC E-Mail is mandatory. *"),
    });

    const onSubmit = (values) => {
        dispatch(createSite(values)).unwrap()
        .then((res)=>{
            setsuccessAlert({ ...successAlert, open: true, message: res.message, isError: false });
            navigate('/site');
        })
        .catch((err) => {
            setsuccessAlert({ ...successAlert, open: true, message: err.message, isError: true });
        });
    };

    return (
        <>
            <Grid container flexDirection={'column'}>
                <Grid item flexGrow={1}>
                    <CustomH2 headingName='Create Site'></CustomH2>
                </Grid>
                <Grid item flexGrow={1}>
                    <CustomDashedBorder />
                </Grid>
            </Grid>


            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                onReset={() => {
                    setResetKey("true");
                }}
            >
                {({ values, setFieldValue, onSubmit }) => (
                    <Form>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>   <CustomTextInput label="Site Name *" name="name" type="text" /></Grid>
                            <Grid item xs={6}>   <CustomTextInput label="Nature Of Business *" name="business" type="text" /></Grid>
                            <Grid item xs={6}>    <CustomTextInput label="SPOC Name *" name="spoc_name" type="text" /></Grid>
                            <Grid item xs={6}>   <CustomTextInput label="SPOC E-Mail ID *" name="spoc_email" type="text" /></Grid>
                            <Grid item xs={6}>   <CustomTextInput label="Address *" name="address" type="text" multiline /></Grid>
                        </Grid>

                        {/* <Controls.Button
                            size="large"
                            type="submit"
                            text="Submit"
                            >
                        </Controls.Button> */}
                        <center>
                            <br /> <br />
                            <Button variant="contained" type='submit' sx={{ m: 2, minWidth: 150 }}>Save</Button>

                        </center>




                        <Backdrop
                            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={isSubmitting}
                        //onClick={handleClose}
                        >
                            <CircularProgress sx={{ color: "white" }} />
                        </Backdrop>
                        {/* <AlertDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                        /> */}
                        
                        <SuccessAlert successAlert={successAlert} />

                    </Form>
                )}
            </Formik>

        </>
    )
}

export default CreateSite
