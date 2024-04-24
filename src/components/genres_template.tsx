import { Link } from "react-router-dom";
import '../App.css';
export interface Genre_Obj {
    id: number;
    name: string;
}

interface Props {
    genre_obj: Genre_Obj[];
}

export const Genre_Template: React.FC<Props> = ({ genre_obj }) => {
   
    return (
        <div className="bg_black p-4 text-center" style={{ width:"100%", borderTopStyle:"inset"}}>
            <div className="row row-cols-1" style={{ width:"100%", justifyContent:"center"}}>
                <h3 className="display-3 mb-4 genres_font">Select from a wide variety of genres</h3>
            </div>
            <div className="row row-cols-6 row-cols-md-6 row-cols-lg-6 m-2">
                {genre_obj.map(item => (
                    <div key={item.id} className="col pill g-4 border mb-3">
                        <Link  to={"/movies"} className="card-link custom-link">
                            <div className='impose p-2 '>
                                {item.name}
                            </div>
                        </Link>
                    </div> 
                ))}
            </div>
        </div>
    );
}