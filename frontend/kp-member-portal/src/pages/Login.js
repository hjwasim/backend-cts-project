import { useForm } from "react-hook-form";
import { Validator } from "../validators";
import { instance } from '../config.axios';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const error = Validator(errors)
    const [errRes, setErrRes] = useState(null);

    const navigate = useNavigate();

    // handle login
    const onSubmit = async (values) => {
        try {
            const { userid, password } = values
            const res = await instance.post('/auth/login', { userid, password });
            const data = await res.data;
            console.log(data)
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('member_id', data.id);
            navigate("/");
        } catch (e) {
            setErrRes({ error: e.response.data['message'] });
        }
    };
    // end

    return (
        <>
            <div className="login_page py-4">
                {
                    errRes && (
                        <div className="alert alert-danger text-center p-2 my-2">
                            {errRes.error}
                        </div>
                    )
                }
                <div className="card border-1 mx-auto my-4 p-3">
                    {
                        error && (
                            <p className="alert alert-danger text-center p-2 my-2">
                                {error}
                            </p>
                        )
                    }
                    <div className="card-header text-center text-uppercase">
                        <h5><b>Login Form</b></h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-2">
                                <input className="form-control" placeholder="User ID/ Email ID" {...register("userid", { required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/ })} />
                            </div>
                            <div className="mb-4">
                                <input className="form-control" type="password" placeholder="Password" {...register("password", { required: true })} />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Login;