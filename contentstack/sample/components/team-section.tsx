import ImageNext from 'next/image';
import React from 'react';

import { Image } from '../types/action';

type AdditionalParam = {
  title: string;
  title_h2: string;
  title_h3: string;
  description: string;
  html_code: string;
  designation: string;
  name: string;
};

type Employee = {
  image: Image;
  name: string;
  designation: string;
  $: AdditionalParam;
};

type TeamProps = {
  title_h2: string;
  description: string;
  $: AdditionalParam;
  employees: [Employee];
};

const TeamSection = ({ ourTeam }: { ourTeam: TeamProps }) => {
  const renderEmployee = (employee: Employee, index: number) => (
    <div className="team-details" key={index}>
      {employee.image && (
        <ImageNext
          src={employee.image.url}
          alt={employee.image.filename}
          {...(employee.image.$?.url as {})}
          width={280}
          height={360}
        />
      )}
      <div className="team-details">
        {employee.name && (
          <h3 {...(employee.$?.name as {})}>{employee.name}</h3>
        )}
        {employee.designation && (
          <p {...(employee.$?.designation as {})}>{employee.designation}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="about-team-section">
      <div className="team-head-section">
        {ourTeam.title_h2 && (
          <h2 {...(ourTeam.$?.title_h2 as {})}>{ourTeam.title_h2}</h2>
        )}
        {ourTeam.description ? (
          <p {...(ourTeam.$?.description as {})}>{ourTeam.description}</p>
        ) : (
          ''
        )}
      </div>
      <div className="team-content">
        {ourTeam.employees?.map(renderEmployee)}
      </div>
    </div>
  );
};

export default TeamSection;
