import { useEffect, useState } from 'react'
import Loader from '../../../Loader';
import Common from '../../Common';
import DataTable, { createTheme } from 'react-data-table-component';
import { NavLink } from 'react-router-dom';

export default function AllUser() {
    const [loader, setloader] = useState(false)

    const [allUser, setallUser] = useState();


    useEffect(() => {

        allUserData();

    }, [])

    const { tokenValue, nodeurl, userRoleValue } = Common();

    const allUserData = async (e) => {
        setloader(true);

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `bearer ${tokenValue}` },
        };

        //   console.log(tokenValue)
        await fetch(nodeurl + 'admins/list', requestOptions).then((res) => res.json())
            .then((res) => {
                console.log(res);

                if (res.status === 200) {

                    setallUser(res.result);

                    setloader(false);

                }

                else if (res.status === 400) {
                    alert("somthing went wrong")
                }

            }
            )
    }


    const [addUserInput, setaddUserInput] = useState({
        name: '',
        email: '',
        password: '',
        usertype: '',
        brand: '',
    })

    const handleInput = (e) => {
        e.persist();
        setaddUserInput({ ...addUserInput, [e.target.name]: e.target.value });
    }

    const addUserForm = async (e) => {
        e.preventDefault();
        setloader(true);
        console.log(addUserInput)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `bearer ${tokenValue}` },
            body: JSON.stringify(addUserInput),
        };

        await fetch(nodeurl + 'admins/add', requestOptions).then((res) => res.json())
            .then((res) => {
                console.log(res);
                setloader(false)

                if (res.status === 200) {
                    alert("Sucess")
                }

                else if (res.status === 400) {
                    alert("somthing went wrong")
                }

            })

    }

    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
            cellExport: (row, index) => index + 1,
            width: '60px',
        },
        {
            name: 'name',
            selector: row => (row.name),
            cellExport: row => (row.name),
        },
        {
            name: 'email',
            selector: row => (row.email),
            cellExport: row => (row.email),
        },
        {
            name: 'User Role',
            selector: row => (row.usertype),
            cellExport: row => (row.usertype),
        },
        {
            name: 'User Brand',
            selector: row => (row.brand),
            cellExport: row => (row.brand),
        },
        {
            name: 'Action',
            cell: (row) => <>
                <button onClick={() => console.log(row._id)} className='btn btn-primary py-1 px-2 me-2 table-btn'>
                    <NavLink to={`/admin/user/${row._id}`}>Edit</NavLink>
                </button>
                {
                    row.status === 'active' ?
                        <div className="status complete">
                            <span>Active</span>
                        </div>
                        : 
                            <div className="status failed">
                                <span>In Active</span>
                            </div>
                }


            </>
        }
    ];

    createTheme('solarized', {
        text: {
            primary: '#ffffff',
            secondary: '#ffffff',
        },
        background: {
            default: 'rgba(0,0,0,0)',
            text: '#FFFFFF',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');

    const customStyles = {
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                background: '#000000',
            },
        },
        cells: {
            style: {
                padding: '10px 8px',
            },
        },

    };

    return (
        <>

            <section>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wrapper-bg common-bg p-4 rounded-2 position-relative">
                                <h3 className='fw-semibold'>Admin User</h3>
                                <div className="table-part table-responsive">
                                    <DataTable theme="solarized" customStyles={customStyles}
                                        data={allUser} progressPending={loader}
                                        columns={columns}
                                        pagination highlightOnHover subHeader
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-9 mx-auto">

                        <div className="wrapper-bg common-bg p-4 rounded-2 position-relative  mt-3">
                            {
                                loader ? <Loader /> : null
                            }
                            <h3 className='fw-semibold'>Create Dashboard User</h3>

                            <form className='mt-2' onSubmit={addUserForm}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="name" name="name" placeholder='name' className="form-control" id="name"
                                        onChange={handleInput} value={addUserInput.name} />
                                    {/* // onChange={(e) => setname(e.target.value)}/> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" name="email" placeholder='email' className="form-control" id="email"
                                        onChange={handleInput} value={addUserInput.email} />
                                    {/* // onChange={(e) => setemail(e.target.value)}/> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name="password" placeholder='password' className="form-control" id="password"
                                        onChange={handleInput} value={addUserInput.password} />
                                    {/* onChange={(e) => setpassword(e.target.value)}/> */}

                                </div>
                                <div className="mb-4">
                                    <label htmlFor="usertype" className="form-label">User Type</label>
                                    <select className="form-select" name="usertype"
                                        onChange={handleInput} value={addUserInput.usertype} >
                                        {/* // onChange={(e) => setusertype(e.target.value)}> */}

                                        <option >Choose Your User Type/Role</option>
                                        <option value="main-admin">Main Admin</option>
                                        <option value="services-admin">Services Admin</option>
                                        <option value="installation-admin">Installation Admin</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="brand" className="form-label">Brand Type</label>
                                    <select className="form-select" name="brand"
                                        onChange={handleInput} value={addUserInput.brand} >
                                        {/* // onChange={(e) => setusertype(e.target.value)}> */}

                                        <option >Choose Your User Brand</option>
                                        {
                                            userRoleValue === 'main-admin' ?
                                                <option value="All">All</option> : null
                                        }
                                        <option value="Thomson">Thomson</option>
                                        <option value="Kodak">Kodak</option>
                                        <option value="Blaupunkt">Blaupunkt</option>
                                        <option value="White Westinghouse">White Westinghouse</option>
                                        <option value="Westinghousetv">Westinghousetv</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
