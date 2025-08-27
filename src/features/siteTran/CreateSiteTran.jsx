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
import { createSiteTran, getSingleSiteTran, modifySiteTran } from '../../slice/SurveAssessmentSlice';
import CustomDatePicker from '../../ui-component/CustomDueDatePicker';
import dayjs from 'dayjs';

const CreateSiteTran = () => {

    const { raid } = useParams();
  const { mySite: id, myRa } = useSelector((state) => state.auth);
debugger;
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
        id: '0',
        start_dt: '',
        end_dt: '',
        name: '',
        active: 'Y'
    };

    const validationSchema = Yup.object({
        name: Yup.string().max(255, "Must be 255 characters or less").required("Description is mandatory. *"),
        start_dt: Yup.string().max(255, "Must be 255 characters or less").required("Start date is mandatory. *"),
        end_dt: Yup.string().max(255, "Must be 255 characters or less").nullable(true),
    });

    const onSubmit = (values) => {
        const payload = {...values, site_id: id}
        setIsSubmitting(true)
        dispatch(raid ? modifySiteTran(payload) : createSiteTran(payload)).unwrap()
        .then((res)=>{
            setIsSubmitting(false)
            setIsDisabled(true);
            setsuccessAlert({ ...successAlert, open: true, message: res.message, isError: false,
                handleClose: () => {
                    //setTimeout(() => {
                    setIsDisabled(false);
                        navigate(`/site/${id}/tran`);
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
    debugger;

        raid && dispatch(getSingleSiteTran({site_id: id, raid})).unwrap()
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

    }, [raid]);

    return (
        <>
            <Grid container flexDirection={'column'}>
                <Grid item flexGrow={1}>
                    <CustomH2 headingName={raid ? 'Modify Assessment' : 'New Assessment'}></CustomH2>
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
                            <Grid item xs={12}>   <CustomTextInput label="Description *" name="name" type="text" /></Grid>
                            <Grid item xs={3}>   
                                <CustomDatePicker
                                    onChange={(date) => {
                                        if (date === null) {
                                          setFieldValue("start_dt", null);
                                        } else {
                                          dayjs(date).format('DD-MM-YYYY') !== 'Invalid Date' && setFieldValue("start_dt",dayjs(date).format('DD-MM-YYYY'));
                                        }
                                    }}
                                    label="Assessment Start Date *"
                                    valuedata={values.start_dt ? dayjs(values.start_dt, 'DD-MM-YYYY') : null}
                                />
                            </Grid>
                            <Grid item xs={9}></Grid>
                            <Grid item xs={3}>  
                                 <CustomDatePicker
                                    onChange={(date) => {
                                        if (date === null) {
                                          setFieldValue("end_dt", null);
                                        } else {
                                          dayjs(date).format('DD-MM-YYYY') !== 'Invalid Date' && setFieldValue("end_dt",dayjs(date).format('DD-MM-YYYY'));
                                        }
                                    }}
                                    label="Assessment End Date"
                                    valuedata={values.end_dt ? dayjs(values.end_dt, 'DD-MM-YYYY') : null}
                                />
                            </Grid>
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

export default CreateSiteTran
