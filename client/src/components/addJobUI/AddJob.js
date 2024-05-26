import React, { useRef } from 'react'
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import './AddJob.css';
import { useDispatch, useSelector } from 'react-redux';
import jobActionTypes from '../../redux/job/jobActionTypes';

const Option = (props) => {
   
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};


function AddJob({handleClick}) {
    const cnRef = useRef();
    const clRef = useRef();
    const ctRef = useRef();
    const pRef = useRef();
    const lRef = useRef();
    const sRef = useRef();
    const desRef = useRef();
    const dRef = useRef();
    const eRef= useRef();
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const branches = [{ value: 'Computer Engineering', label: 'Computer Engineering' },
    { value: 'Civil Engineering', label: 'Civil Engineering' },
    { value: 'Electronics and Communication Engineering', label: 'Electronics and Communication Engineering' },
    { value: 'Electrical Engineering', label: 'Electrical Engineering' },
    { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
    { value: 'Production and Industrial Engineering', label: 'Production and Industrial Engineering' },
    { value: 'Information Technology', label: 'Information Technology' }
    ];

    function getBase64(file) {
        return new Promise((resolve,reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload=()=>{
                resolve(reader.result) 
            }
            reader.onerror=(error)=>{
                reject(error)
            };
        });
    }

    async function handleSubmit(event){
        event.preventDefault();
        // console.log('clicked');
        // console.log(eRef.current.value);
        const value = eRef?.current?.state?.selectValue;
        let data = [];
        for(let v of value){
            data.push(v.value);
        }
        const base64= await getBase64(clRef.current.files[0]);
        const temp = {
            email:user.email,
            data:{
                companyLogo:base64,
                companyName:cnRef.current.value,
                position:pRef.current.value,
                location:lRef.current.value,
                category:ctRef.current.value,
                salary:sRef.current.value,
                description:desRef.current.value,
                eligibility:data,
                deadline:dRef.current.value,
                filename:clRef.current.files[0].name
            }
        }
        dispatch({type:jobActionTypes.CREATE_JOB_START,payload:{data:temp,token:user.token}})
        handleClick();
    }
    
    return (
        <div className='addJobContainer'>
            <div className='addJob'>
                <h4>Add Job 
                    <button className='ajSubmit' style={{margin:'0px'}} onClick={handleClick}>Cancel</button>
                </h4>
                <form onSubmit={handleSubmit}>
                    <table className='ajTable'>
                        <tr>
                            <td className='ajLeft'>Company Name:</td>
                            <td><input
                                type='text'
                                ref={cnRef}
                                required /></td>
                        </tr>
                        <tr>
                            <td className='ajLeft'>Company Logo:</td>
                            <td><input
                                type='file'
                                ref={clRef}
                                accept="image/png, image/jpeg"
                                required /></td>
                        </tr>
                        <tr>
                            <td className='ajLeft'>Category:</td>
                            <td><select ref={ctRef} required>
                                <option >PSU</option>
                                <option >Non-PSU</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td className='ajLeft'>Position:</td>
                            <td><input ref={pRef} type='text' required /></td>
                        </tr>
                        <tr>
                            <td className='ajLeft'>Eligibility:</td>
                            <td>
                                <ReactSelect
                                    options={branches}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={true}
                                    components={{
                                        Option
                                    }}
                                    ref={eRef}
                                    // styles={{fontSize:'0.5rem'}}
                                    // onChange={this.handleChange}
                                    allowSelectAll={true}
                                    // value={this.state.optionSelected}
                                />

                            </td>
                        </tr>
                        <tr>
                            <td className='ajLeft'>Location:</td>
                            <td><input ref={lRef} type='text' required /></td>
                        </tr>
                        <tr>
                            <td className='ajLeft'>Salary(in INR):</td>
                            <td><input ref={sRef} type='number' required /></td>
                        </tr>
                        <tr>
                            <td className='ajLeft'>Description:</td>
                            <td><input ref={desRef} type='textarea' required /></td>
                        </tr>
                        <tr>
                            <td className='ajLeft'>Deadline</td>
                            <td><input ref={dRef} type='datetime-local' required /></td>
                        </tr>
                        
                    </table>
                    <div className='ajSubmitHolder'><input className='ajSubmit' type='submit' defaultValue='Save' /></div> 
                </form>
            </div>
        </div>
    )
}

export default AddJob