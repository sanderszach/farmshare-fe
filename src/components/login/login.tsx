import { Button } from '@progress/kendo-react-buttons';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Error } from "@progress/kendo-react-labels";
import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components';

interface OwnProps {
    setToken?: any
}

async function loginUser(credentials) {
    return fetch('http://localhost:8055/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

export const Login:React.FC<OwnProps> = ({setToken}) => {

    const handleSubmit = async dataValue => {
        const token = await loginUser({
          email:dataValue.username,
          password:dataValue.password
        });

        setToken(token);

        // TODO: This is a temporary solution. It reloads the page after a login
        if(token.data){
            window.location.reload(); 
        }
    }

    const emailRegex = new RegExp(/\S+@\S+\.\S+/);
    const emailValidator = (value) => emailRegex.test(value) ? "" : "Please enter a valid email.";
    const EmailInput = (fieldRenderProps) => {
        const { validationMessage, visited, ...others } = fieldRenderProps;
        return (
            <div>
            <Input {...others} />
            {visited && validationMessage && <Error>{validationMessage}</Error>}
            </div>
        );
    };
    return(
        <LoginWrapper>
            <ImageWrapper>
            </ImageWrapper>
            <SignInFormWrapper>
                <h2>Sign In</h2>
                <Form
                    onSubmit={handleSubmit}
                    render={(formRenderProps) => (
                        <FormElement>
                        <fieldset className={"k-form-fieldset"}>
                            <Field
                                name={"username"}
                                type={"email"}
                                component={EmailInput}
                                label={"Email"}
                                validator={emailValidator}
                            />
                            <Field
                                name={"password"}
                                type={"password"}
                                component={Input}
                                label={"Password"}
                            />
                        </fieldset>
                        <div className="k-form-buttons">
                            <Button
                            type={"submit"}
                            disabled={!formRenderProps.allowSubmit}
                            style={{width:'100%'}}
                            primary
                            >
                            Submit
                            </Button>
                        </div>
                        </FormElement>
                    )}
                />
            </SignInFormWrapper>
        </LoginWrapper>
    )
}

const LoginWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
`
const SignInFormWrapper = styled.div`
    flex: 2;
    padding: 40px;
    margin: 100px auto;
`
const ImageWrapper = styled.div`
    flex: 3;
    background-size: cover;
    background-color: #212121;
    background-image: url(/static/login-image.jpeg);
    background-repeat: no-repeat;
    background-position: center;
    @media (max-width: 600px) {
        display: none;
    }
`

// const ContainerCard = styled(Card)<{col?:number}>`
//     padding: 20px;
//     flex: ${props => (props.col || 1).toString()};
//     margin: 12px;
// `
// const DashboardContent = styled.div`
//     display: flex;
//     flex-wrap: wrap;

//     @media (max-width: 600px) {
//         display: block;
//     }
// `