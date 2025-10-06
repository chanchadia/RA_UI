import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomH2 from '../../ui-component/Headings/CustomH2';
import { Backdrop, CircularProgress } from '@mui/material';
import Button , {CancelButton} from '../../ui-component/Controls/Button';
import SuccessAlert from '../../ui-component/snackbar';
import { Form, Formik } from 'formik';
import * as Yup from "yup";

import Grid from '@mui/material/GridLegacy';

import CustomTextInput from "../../ui-component/CustomTextInputField/customTextInput";
import Controls from "../../ui-component/Controls/Controls";
import CustomDashedBorder from '../../ui-component/CustomDashedBorder';
import { createSite, getSingleSite, modifySite } from '../../slice/SiteSlice';
import { useNavigate, useParams } from 'react-router-dom';

import YupPassword from 'yup-password';
import { createUser } from '../../slice/AuthSlice';

YupPassword(Yup); // Extend Yup with password methods

const CreateUser = () => {

    //const {id} = useParams();
    const id = null;

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
        login_id: "",
        pwd: "",
        email: "",
        active: "Y"
    };

    const advancedPasswordSchema = Yup.string()
  .required('Password is required')
  .min(8, 'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
  .minLowercase(1, 'Password must contain at least 1 lowercase letter')
  .minUppercase(1, 'Password must contain at least 1 uppercase letter')
  .minNumbers(1, 'Password must contain at least 1 number')
  .minSymbols(1, 'Password must contain at least 1 special character');

    const validationSchema = Yup.object({
        name: Yup.string().max(255, "Must be 255 characters or less").required("Name is mandatory."),
        login_id: Yup.string().max(255, "Must be 255 characters or less").required("Login ID is mandatory."),
        pwd: advancedPasswordSchema,
        email: Yup.string().max(255, "Must be 255 characters or less").required("E-Mail is mandatory. *").email('Invalid email address'),
    });

    const onSubmit = (values) => {
        setIsSubmitting(true)
        dispatch(createUser(values)).unwrap()
        .then((res)=>{
            setIsSubmitting(false)
            setIsDisabled(true);
            setsuccessAlert({ ...successAlert, open: true, message: res.message, isError: false,
                handleClose: () => {
                    //setTimeout(() => {
                    setIsDisabled(false);
                        navigate('/users');
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
                            <Grid item xs={6}>   <CustomTextInput label="Login ID *" name="login_id" type="text" /></Grid>
                            <Grid item xs={6}>   <CustomTextInput label="Name *" name="name" type="text" /></Grid>
                            <Grid item xs={6}>   <CustomTextInput label="Password *" name="pwd" type="password" /></Grid>
                            <Grid item xs={6}>   <CustomTextInput label="E-Mail ID *" name="email" type="text" /></Grid>
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
                            <CancelButton sx={{ m: 2, minWidth: 150 }}
                            onClick={()=>{
                                navigate('/users');
                            }}>Cancel</CancelButton>

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

export default CreateUser
