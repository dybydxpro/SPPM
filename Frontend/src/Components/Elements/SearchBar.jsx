import { FaSearch } from "react-icons/fa";
import './Elements.css';

export default function SearchBar(props) {
    return (
        <>
            <div className="d-flex my-0">
                <input className="form-control mr-sm-2 radius__square" onChange={(e)=>{props.setSearchTerm(e.target.value)}} type="search" placeholder="Search by name or email" value={props.searchTerm} aria-label="Search" />
                <button className="btn btn-dark my-2 my-sm-0 radius__square" onClick={props.search} type="search" placeholder="submit"><FaSearch/></button>
            </div>
        </>
    );
}