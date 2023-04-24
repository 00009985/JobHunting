import React from 'react';
import './pages.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import Reviews from '../components/Reviews';

function Job(props) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ['job'],
    queryFn: () =>
      newRequest.get(`/jobs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const handleApply = () => {
    newRequest.post(`/applications/${id}`).then((res) => {
      return res.data;
    });
  };

  const handleFavorites = () => {
    newRequest.post(`/favorite/${id}`).then((res) => {
      return res.data;
    });
  };

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
              <button className="btn_apply" onClick={handleApply}>
                Apply
              </button>
              <button
                className="btn_apply"
                onClick={handleFavorites}
                disabled={currentUser.isRecruiter}
              >
                Add to favorites
              </button>
            </div>
            <div className="job_description">
              <h2>Description</h2>
              <span>{data.description}</span>
              <h2>Working hours</h2>
              <h2>Skills</h2>
              <span>{data.skills}</span>
              <h2>Date posted</h2>
              <span>29.03.2023</span>
            </div>
            <Reviews jobId={id} />
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
