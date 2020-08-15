import React from "react";
import { MDBBox, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { MDBCardImage, MDBCardTitle, MDBCardText, MDBIcon } from 'mdbreact';
import ListTransfer from "./ListTransfer";
import CustomTransferList from "./CustomTransferList";



const FormPage = (props) => {

    const [crops, setCrops] = React.useState([]);
    const [indicators, setIndicators] = React.useState([])

    React.useEffect(() => {
        console.log(props.indicatorProps);
        setCrops(props.arrayProps);
        setIndicators(props.indicatorProps)
    }, [props.arrayProps, props.indicatorProps])


    const handleButton = () => {
        props.buttonCallback();
    }

    return (
        <div>
                    <MDBBtn color="cyan"
                            onClick={handleButton}
                            className="text-white float-lg-right mr-5" type="submit">
                        Back
                    </MDBBtn>

                    <hr className='hr-light' />

                    <MDBBox display="flex" justifyContent="center" >
                        <MDBCol className="mb-5" md="10">
                            <MDBCard>
                                <MDBCardBody>
                                    <form>
                                        <p className="h4 text-center py-4">Create Report</p>
                                        <div className="grey-text">
                                            <MDBInput
                                                label="enter report title"
                                                icon="user"
                                                group
                                                type="text"
                                                validate
                                                error="wrong"
                                                success="right"
                                            />
                                            <MDBInput
                                                label="enter number of rows"
                                                icon="envelope"
                                                group
                                                type="number"
                                                validate
                                                error="wrong"
                                                success="right"
                                            />
                                            <MDBInput
                                                label="enter number of columns"
                                                icon="exclamation-triangle"
                                                group
                                                type="number"
                                                validate
                                                error="wrong"
                                                success="right"
                                            />

                                            <div className="my-3">
                                                <p className="text-center">Select Indicator program to be on the report</p>
                                                <ListTransfer />
                                            </div>

                                            <div className="mt-5">
                                                <p className="text-center">Select Crops to be on the report</p>
                                                <ListTransfer array={crops}/>
                                            </div>
                                        </div>
                                        <div className="text-center py-4 mt-5">
                                            <MDBBtn color="cyan" className="text-white" type="submit">
                                                create
                                            </MDBBtn>
                                        </div>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBBox>


        </div>


    );
};

export default FormPage;