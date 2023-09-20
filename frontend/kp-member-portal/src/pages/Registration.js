import { useForm } from "react-hook-form";
import { Validator } from "../validators";
import { instance } from '../config.axios';

const Registration = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const error = Validator(errors)

    // handle registration
    const onSubmit = async (data) => {
        const { email, fname, lname, password } = data
        try {
            const res = await instance.post('/auth/registration', { email, fname, lname, password });
            const data = await res.data;
            console.log(data);
        } catch (error) {
            alert("========= ERROR =========")
        }
    };
    // end

    return (
        <>
            <div className="login_page py-4">
                <div className="card border-1 mx-auto my-4 p-3">
                    {
                        error && (
                            <div className="alert alert-danger text-center p-2 my-2">
                                {error}
                            </div>
                        )
                    }
                    <div className="card-header text-center text-uppercase">
                        <h5><b>Registration Form</b></h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-2">
                                <input className="form-control" placeholder="First name" {...register("fname", { required: true })} />
                            </div>
                            <div className="mb-2">
                                <input className="form-control" placeholder="Last name" {...register("lname", { required: true })} />
                            </div>
                            <div className="mb-2">
                                <input className="form-control" placeholder="Email ID" {...register("email", { required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/ })} />
                            </div>
                            <div className="mb-4">
                                <input className="form-control" type="password" placeholder="Password" {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/ })} />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Registration;