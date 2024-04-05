import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";
import * as RiIcons from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
// import { NavbarData } from './NavbarData'
import './Navbar.css'
import { IconContext } from 'react-icons'


function Navbar() {
    const navigate = useNavigate()
    const [sidebar, setSidebar] = useState(false);
    const [userLevel, setUserLevel] = useState(0);

    useEffect(() => {
        setUserLevel(Number(localStorage.getItem("level")));
    }, [])

    const showSidebar = () => setSidebar(!sidebar)

    function logout(){
        localStorage.clear();
        setUserLevel(0);
        // window.location.reload();
        navigate('/')
    }


    function listPrint() {
        if (userLevel == 1) {
            return (
                <>
                 <li className="nav-text">
                        <Link to={'/viewuser'}><AiIcons.AiOutlineUserAdd /><span>User Management</span></Link>
                    </li>
                    <li className="nav-text">
                        <Link to={'/stock'}><MdIcons.MdInventory /><span>Stock Management</span></Link>
                    </li>
                    <li className="nav-text">
                        <Link to={'/viewcustomer'}><FaUsers /><span>Customer Management</span></Link>
                    </li>
                    <li className="nav-text">
                        <Link to={'/viewsupplier'}><TbIcons.TbTruckDelivery /><span>Suppliers</span></Link>
                    </li>
                    <li className="nav-text">
                        <Link to={'/bill'}><FaIcons.FaMoneyCheckAlt /><span>Billing</span></Link>
                    </li>
                    <li className="nav-text">
                        <Link to={'/addbank'}><AiIcons.AiFillBank /><span>bank</span></Link>
                    </li>
                    <li className="nav-text">
                        <button className='navButton' onClick={logout}><RiIcons.RiLogoutBoxLine/><span>LOG OUT</span></button>
                    </li>
                </>
            );
        }
        else if(userLevel == 2){
            return (
                <>
                <li className="nav-text">
                        <Link to={'/stock'}><MdIcons.MdInventory /><span>Stock Management</span></Link>
                    </li>
                    <li className="nav-text">
                        <Link to={'/viewcustomer'}><FaUsers /><span>Customer Management</span></Link>
                    </li>
                    <li className="nav-text">
                        <Link to={'/viewsupplier'}><TbIcons.TbTruckDelivery /><span>Suppliers</span></Link>
                    </li>
                    <li className="nav-text">
                        <Link to={'/bill'}><FaIcons.FaMoneyCheckAlt /><span>Billing</span></Link>
                    </li>
                    <li className="nav-text">
                        <button className='navButton' onClick={logout}><RiIcons.RiLogoutBoxLine/><span>LOG OUT</span></button>
                    </li>
                </>
            );
        }
        else if(userLevel == 3){
            return (
                <>
                    <li className="nav-text">
                        <Link to={'/bill'}><FaIcons.FaMoneyCheckAlt /><span>Billing</span></Link>
                    </li>
                    <li className="nav-text">
                        <button className='navButton' onClick={logout}><RiIcons.RiLogoutBoxLine/><span>LOG OUT</span></button>
                    </li>
                </>
            );
        }
        else{
            return (
                <>
                    <li className="nav-text">
                        <Link to={'/login'}><IoIcons.IoMdLogIn /><span>Login</span></Link>
                    </li>
                </>
            );
        }
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <Link to="#" className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    {/* <h1>Dealz Super</h1> */}
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} style={{ zIndex: 10 }}>
                    <ul className='nav-menu-items' onClick={showSidebar} >
                        <li className="navbar-toggle">
                            <Link to="#" className='menu-bars'>
                                <AiIcons.AiFillCloseSquare />
                            </Link>
                        </li>


                        <li className="nav-text">
                            <Link to={'/'}><AiIcons.AiFillHome /><span>Home</span></Link>
                        </li>
                        
                        {listPrint()}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar