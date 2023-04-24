import React from 'react';
import './pages.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import Reviews from '../components/Reviews';
import Favorite from '../components/Favorite';

function Job() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const jobId = useParams();
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ['job'],
    queryFn: () =>
      newRequest.get(`/jobs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="job">
      {isLoading ? (
        'loading'
      ) : error ? (
        'Something went wrong'
      ) : (
        <div className="container containerjob">
          <div className="jobleft">
            <div className="job_maindetails">
              <h1 className="jobname">{data.jobName}</h1>
              <span>{data.Salary}</span>
              <span>{data.experience}</span>
              <button className="btn_apply">Apply</button>
              <Favorite userFrom={currentUser._id} jobId={jobId} jobInfo={data}/>
            </div>
            <div className="job_description">
              <h2>Description</h2>
              <span>{data.description}</span>
              <h2>Working hours</h2>
              <span>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nesciunt, alias. Maiores ex tempore ullam vel id molestias
                repellendus quis, rerum facilis quod. Quo molestias sed quisquam
                vel, nesciunt cum enim?
              </span>
              <h2>Skills</h2>
              <span>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                sed molestiae dolores dolorum? Fugit, maxime, quasi id fuga
                numquam eos dolorum incidunt minus recusandae iusto voluptates
                nesciunt. Eos, ullam. Quisquam.
              </span>
              <h2>Date posted</h2>
              <span>29.03.2023</span>
            </div>
            <Reviews jobId={id}/>
          </div>
          <div className="jobright">
            <img
              src="../images/heart.png"
              alt=""
              className="job_company_logoimg"
            />
            <p className="job_company_name">
              Westminster International University in Tashkent, address
            </p>
            <p className="job_company_address">
              12 Istiqbol ko'chasi, Tashkent 100047
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Job;
