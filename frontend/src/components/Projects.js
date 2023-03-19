import React from 'react'
import Project from './Project';

function Projects() {
    const projectData = [
        {
          id: 1,
          name: 'Project Name 1',
          users: ['User 1A', 'User 1B'],
          hwSet1: {
            maxQty: 100,
            checkedOutQty: 50,
          },
          hwSet2: {
            maxQty: 100,
            checkedOutQty: 0,
          },
        },
        {
          id: 2,
          name: 'Project Name 2',
          users: ['User 2A', 'User 2B'],
          hwSet1: {
            maxQty: 100,
            checkedOutQty: 50,
          },
          hwSet2: {
            maxQty: 100,
            checkedOutQty: 0,
          },
        },
        {
          id: 3,
          name: 'Project Name 3',
          users: ['User 3A', 'User 3B'],
          hwSet1: {
            maxQty: 100,
            checkedOutQty: 0,
          },
          hwSet2: {
            maxQty: 100,
            checkedOutQty: 0,
          },
        },
      ];

      const projectsList = projectData.map((project) => (
        <Project key={project.id} project={project} />
      ));
        
  return (
    <div className="bg-white flex justify-center flex-col px-10 align-middle content-center border-black border-2 border-solid m-10 w-fit">
      <div className="font-bold my-5 px-3">
        <h1>Projects</h1>
      </div>
      <div className="">{projectsList}</div>
    </div>
  )
}

export default Projects