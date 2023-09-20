import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Validator } from "../validators";
import { instance } from '../config.axios';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [simMemberId, setSimMemberId] = useState("");
    const [assignMemberId, setAssignMemberId] = useState("");
    const [caregiver, setCaregiver] = useState({ fname: "", lname: "", email: "", member_id: "", caregiver_id: "" });
    const [errRes, setErrRes] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function verify() {
            try {
                instance.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
                await instance.get("/auth/verify")
            } catch (e) {
                navigate("/login")
            }
        }
        verify();
    }, [])

    const error = Validator(errors)

    const onSimpleSearchSubmit = async (event) => {
        try {
            event.preventDefault();
            setErrRes(null);

            if (!simMemberId) {
                alert("Provide Member ID");
                return;
            };
            const res = await instance.get(`/caregiver/search/simple/${simMemberId}`);
            const data = await res.data['results'];

            if (data?.error) {
                setErrRes({ error: data.error });
            }
            setCaregiver({
                email: data.email,
                fname: data.fname,
                lname: data.lname,
                member_id: data.member_id,
                caregiver_id: data.caregiver_id
            })
            setAssignMemberId("")
        } catch (e) {
            console.log(e)
            setErrRes({ error: e.response.data['message'] });
        }
    };

    const onAdvSearchSubmit = async (values) => {
        try {
            setErrRes(null);
            const { email, fname, lname } = values;

            const res = await instance.post('/caregiver/search/advance', { email, fname, lname });
            const data = await res.data['results'];

            if (data?.error) {
                setErrRes({ error: data.error });
            }
            console.log(data);
            setCaregiver({
                email: data.email,
                fname: data.fname,
                lname: data.lname,
                caregiver_id: data.id
            })
            setAssignMemberId("")
        } catch (e) {
            setErrRes({ error: e.response.data['message'] });
        }
    };

    const onAssignCaregiver = async (event) => {
        try {
            event.preventDefault();
            setErrRes(null);

            const res = await instance.get(`/caregiver/assign/${assignMemberId}`);
            const data = await res.data;
            alert(data['message'])
            setAssignMemberId("")
        } catch (e) {
            setErrRes({ error: e.response.data['message'] });
        }
    }

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
                <div className="row">
                    <div className="col-8">
                        <div className="card p-2 border-1">
                            <div className="card-header text-center text-uppercase">
                                <h5><b>Search Caregiver</b></h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 my-2">
                                        <div>Simple Search</div>
                                        <div className="mb-2">
                                            <input type="number" className="form-control" value={simMemberId} onChange={(e) => setSimMemberId(e.target.value)} placeholder="Member ID" />
                                        </div>
                                        <button type="button" onClick={onSimpleSearchSubmit} className="btn btn-primary w-100">Search</button>
                                    </div>
                                    <div className="col-6 my-2">
                                        <div>Advance Search</div>
                                        {
                                            error && (
                                                <div className="alert alert-danger text-center p-2 my-2">
                                                    {error}
                                                </div>
                                            )
                                        }
                                        <form onSubmit={handleSubmit(onAdvSearchSubmit)}>
                                            <div className="mb-2">
                                                <input className="form-control" placeholder="First name" {...register("fname", { required: true })} />
                                            </div>
                                            <div className="mb-2">
                                                <input className="form-control" placeholder="Last name" {...register("lname", { required: true })} />
                                            </div>
                                            <div className="mb-2">
                                                <input className="form-control" placeholder="Email ID" {...register("email", { required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/ })} />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100">Search</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card p-2 border-1">
                            <div className="card-header text-center text-uppercase">
                                <h5><b>Assign - Caregiver</b></h5>
                            </div>
                            <div className="card-body">
                                <label>Enter Member ID to assign</label>
                                <div className="mb-2">
                                    <input type="number" className="form-control" value={assignMemberId} onChange={(e) => setAssignMemberId(e.target.value)} placeholder="Member ID" />
                                </div>
                                <button type="button" onClick={onAssignCaregiver} className="btn btn-danger w-100">Assign</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 my-2">
                        <div className="card p-2 border-1">
                            <div className="card-header text-center text-uppercase">
                                <h5><b>Results - Caregiver</b></h5>
                            </div>
                            <div className="card-body">
                                <table class="table table-primary">
                                    <thead>
                                        <tr>
                                            <th scope="col">First name</th>
                                            <th scope="col">Last name</th>
                                            <th scope="col">Email ID</th>
                                            <th scope="col">Caregiver ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{caregiver.fname}</td>
                                            <td>{caregiver.lname}</td>
                                            <td>{caregiver.email}</td>
                                            <td>{caregiver.caregiver_id}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
};

export default Home;