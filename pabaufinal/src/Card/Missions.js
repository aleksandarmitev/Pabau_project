import React, { Fragment } from "react"; 
import { useQuery, gql } from "@apollo/client"
import "./Missions.css";

const GET_MISSIONS = gql`
{
    launchesPast(limit: 14, offset: 10) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        flickr_images
      }
      rocket {
        rocket_name
        rocket_type
      }
      id
      details
      launch_success
    }
  }
  
  
  
  
`;

export default function Missions(){
    const {error, loading, data} = useQuery(GET_MISSIONS);
    
    
        if(loading) return <div>loading..</div>;
        if(error) return <div>Something went wrong</div>
        
    
    return (
        <div className="container">
            <div className="MissionList" >
            {
                data.launchesPast.map((mission)=>{
                    return(
                            <div className="col-sm-6">
                            <div className="row">
                                
                                <img src={mission.links.flickr_images} className="raketi"/>
                                
                                <h2>{mission.mission_name}</h2>
                                <p>{mission.id}</p>
                                <p>{mission.launch_site.site_name_long}</p>
                                <p>{mission.launch_date_local}</p>
                                
                                
                                
                                <div class="d-grid gap-2 d-md-block">
                                    <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">View More</button>
                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">{mission.rocket.rocket_name}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <h5 class="modal-title" id={"mission.id"}>{mission.rocket.rocket_name}</h5>
                                        <h5 class="modal-title" id="exampleModalLabel">{mission.rocket.type}</h5>
                                        <p>{mission.details}</p>
                                        <p>{mission.launch_date_local}</p>
                                        
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                </div>
                            </div>
                            
                            
                                        
                            
                        </div>
                    );
                    
                    

                })

            }

        </div>

        </div>
        
    );
    
}