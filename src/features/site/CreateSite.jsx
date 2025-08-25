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
import { createSite, getSingleSite, modifySite } from '../../slice/SiteSlice';
import { useNavigate, useParams } from 'react-router-dom';

const CreateSite = () => {

    const {id} = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
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

    const [singleSiteData, setSingleSiteData] = useState(null);

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
        setIsSubmitting(true)
        dispatch(id ? modifySite(values) : createSite(values)).unwrap()
        .then((res)=>{
            setIsSubmitting(false)
            setIsDisabled(true);
            setsuccessAlert({ ...successAlert, open: true, message: res.message, isError: false,
                handleClose: () => {
                    //setTimeout(() => {
                    setIsDisabled(false);
                        navigate('/site');
                    //}, 1000);
                }
             });
        })
        .catch((err) => {
            setsuccessAlert({ ...successAlert, open: true, message: err.message, isError: true });
            setIsSubmitting(false)
        });
    };

    useEffect(()=>
    {
        id && dispatch(getSingleSite(id)).unwrap()
            .then((resp)=>{
              if(resp)
              {
                setSingleSiteData({...resp.data[0]});
              } 
            })
            .catch((err) => {
                setSingleSiteData(true); // to disable form
                setsuccessAlert({ ...successAlert, open: true, message: err.message, isError: true });
            });

    }, [id]);

    return (
        <>
            <Grid container flexDirection={'column'}>
                <Grid item flexGrow={1}>
                    <CustomH2 headingName={id ? 'Modify Site' : 'Create Site'}></CustomH2>
                </Grid>
                <Grid item flexGrow={1}>
                    <CustomDashedBorder />
                </Grid>
            </Grid>


            <Formik enableReinitialize={true}
                initialValues={singleSiteData || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                onReset={() => {
                    //setResetKey("true");
                }}
            >
                {({ values, setFieldValue, onSubmit }) => (
                    <Form>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>   <CustomTextInput label="Site Name *" name="name" type="text" /></Grid>
                            <Grid item xs={6}>   <CustomTextInput label="Nature Of Business *" name="business" type="text" /></Grid>
                            <Grid item xs={6}>   <CustomTextInput label="SPOC Name *" name="spoc_name" type="text" /></Grid>
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

                        <Backdrop
                            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                            open={isDisabled}
                            //onClick={handleClose}
                        ></Backdrop>

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
