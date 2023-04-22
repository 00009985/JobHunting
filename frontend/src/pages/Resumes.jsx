import React from 'react';
import './pages.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

function Resumes() {
//   const { id } = useParams();
//   const { isLoading, error, data } = useQuery({
//     queryKey: ['resume'],
//     queryFn: () =>
//       newRequest.get(`/resumes/single/${id}`).then((res) => {
//         return res.data;
//       }),
//   });

//   return (
//     <div className="job">
//       {isLoading ? (
//         'loading'
//       ) : error ? (
//         'Something went wrong'
//       ) : (
//         <div className="container containerjob">
//           <div className="jobleft">
//             <div className="job_maindetails">
//               <h1 className="jobname">{data.resumeName}</h1>
//               <span>{data.Age}</span>
//               <span>{data.experience}</span>
//               <button className="btn_apply">Apply</button>
//             </div>
//             <div className="job_description">
//               <h2>Description</h2>
//               <span>{data.description}</span>
//               <h2>Working hours</h2>
//               <span>
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                 Nesciunt, alias. Maiores ex tempore ullam vel id molestias
//                 repellendus quis, rerum facilis quod. Quo molestias sed quisquam
//                 vel, nesciunt cum enim?
//               </span>
//               <h2>Skills</h2>
//               <span>
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
//                 sed molestiae dolores dolorum? Fugit, maxime, quasi id fuga
//                 numquam eos dolorum incidunt minus recusandae iusto voluptates
//                 nesciunt. Eos, ullam. Quisquam.
//               </span>
//               <h2>Date posted</h2>
//               <span>29.03.2023</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
}

export default Resumes;
