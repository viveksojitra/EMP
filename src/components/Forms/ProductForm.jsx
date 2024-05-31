/* eslint-disable react/prop-types */
import { faEye, faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import generateUniqueId from "generate-unique-id";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { GetData } from "../../services/GetData";

// Controlled Form With Single-State
function ProductForm() {

    // Input State
    const [input, setInput] = useState({
        id: '',
        fname: '',
        lname: '',
        email: '',
        address: '',
        phone: '',
    });

    // Submit State
    const [tableData, setTableData] = useState(GetData("database"));

    // Input Handle
    const handleInput = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setInput({ ...input, [name]: value });
    }

    // Update Handle
    const handleUpdate = (id) => {

        let record = tableData;
        let updatedRecord = record.filter((data) => {
            return (
                data.id === id
            )
        })

        setInput(updatedRecord[0]);
    }

    // Delete Handle
    const handleDelete = (id) => {

        let record = tableData;
        let deletedRecord = record.filter((data) => data.id != id);

        setTableData(deletedRecord);
    }

    // Clear Button
    const handleData = () => {
        localStorage.clear();

        setTableData([]);
    }

    // Submit Handle
    const handleSubmit = (event) => {
        event.preventDefault();

        // if (input.fname === '' || input.lname === '' || input.email === '' || input.address === '' || input.phone === '') {
        //     return alert("*All input fields are required to be field!");
        // } else {
        if (input.id) {
            setTableData(tableData.map((record) => {

                if (record.id === input.id) {
                    return { ...record, ...input }
                }
                else {
                    return record
                }
            }))
        } else {
            const idGen = {
                ...input,
                id: generateUniqueId({
                    length: 4,
                    useLetters: false,
                }),
            }

            setTableData([...tableData, idGen])
        }
        // }

        setInput({
            id: '',
            fname: '',
            lname: '',
            email: '',
            address: '',
            phone: '',
        });
    };

    useEffect(() => {
        localStorage.setItem("database", JSON.stringify(tableData))
    }, [tableData])

    return (
        <>
            {/* Form */}
            <Container className="pt-5">
                <section className="pb-5 position-static" >
                    <Form className='form-wrapper boxshadow' onSubmit={handleSubmit}>
                        <Form.Control className="input" type="text" name='id' value={input.id} onChange={handleInput} hidden />

                        {/* title */}
                        <h1 className="title">New Employee</h1>

                        {/* row-1 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">First Name</Form.Label>
                            <Form.Control className="input capitalise" type="text" name='fname' value={input.fname} placeholder='First Name' onChange={handleInput} />
                        </Form.Group>

                        {/* row-2 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Last Name</Form.Label>
                            <Form.Control className="input capitalise" type="text" name='lname' value={input.lname} placeholder='Last name' onChange={handleInput} />
                        </Form.Group>

                        {/* row-3 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Email</Form.Label>
                            <Form.Control className="input" type="email" name='email' value={input.email} placeholder='Email' onChange={handleInput} />
                        </Form.Group>

                        {/* row-4 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Address</Form.Label>
                            <Form.Control as="textarea" rows={2} className="textarea capitalise" type="text" name='address' value={input.address} placeholder='Address' onChange={handleInput} />
                        </Form.Group>

                        {/* row-5 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Phone</Form.Label>
                            <Form.Control className="input" type="number" name='phone' value={input.phone} placeholder='Phone' onChange={handleInput} />
                        </Form.Group>

                        {/* submit */}
                        <Button className="btn-submit d-flex mt-4 mx-auto" type="submit">
                            submit
                        </Button>
                    </Form>
                </section>
            </Container>

            <div className="line"></div>

            <div>
                {/* Table Title */}
                <div className="d-flex justify-content-between title-table p-0 align-items-center">
                    <h3 className="title-table m-0">Manage Employees</h3>
                    {/* submit */}
                    <Button className="btn-clear d-flex me-2" type="button" onClick={handleData}>
                            Clear
                    </Button>
                </div>

                {/* Table */}
                <div className="table-wrapper boxshadow pt-2">
                    <section className="tableFixHead">
                        <Table className="table" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>first name</th>
                                    <th>last name</th>
                                    <th>email</th>
                                    <th>address</th>
                                    <th>phone</th>
                                    <th>actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableData.map((row) => (
                                        <tr key={row.id}>
                                            <td className="capitalise">{row.fname}</td>
                                            <td className="capitalise">{row.lname}</td>
                                            <td>{row.email}</td>
                                            <td className="capitalise">{row.address}</td>
                                            <td>{row.phone}</td>
                                            <td className="d-flex justify-content-center gap-2">
                                                {/* Button Update */}
                                                <button className="btn btn-eye" onClick={() => handleUpdate(row.id)}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>

                                                {/* Button Update */}
                                                <button className="btn btn-update" onClick={() => handleUpdate(row.id)}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>

                                                {/* Button - Delete */}
                                                <button className="btn btn-delete">
                                                    <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete(row.id)} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </section>
                </div>
            </div>
        </>
    )
}

export default ProductForm;