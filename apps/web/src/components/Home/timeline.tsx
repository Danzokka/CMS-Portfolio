import React from 'react'

const Timeline = () => {
  return (
    <ol className="relative space-y-8 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-gray-200 dark:before:bg-gray-700">
      <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
        <div className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last">
          <span className="size-3 shrink-0 rounded-full bg-blue-600"></span>

          <div className="-mt-2">
            <time className="text-xs/none font-medium text-gray-700 dark:text-gray-200">
              12/02/2025
            </time>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Kickoff
            </h3>

            <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              officiis tempora ipsum adipisci tenetur sunt quae exercitationem
              sed pariatur porro!
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>

      <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
        <div className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last">
          <span className="size-3 shrink-0 rounded-full bg-blue-600"></span>

          <div className="-mt-2">
            <time className="text-xs/none font-medium text-gray-700 dark:text-gray-200">
              5/03/2025
            </time>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              First Milestone
            </h3>

            <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              officiis tempora ipsum adipisci tenetur sunt quae exercitationem
              sed pariatur porro!
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>

      <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
        <div className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last">
          <span className="size-3 shrink-0 rounded-full bg-blue-600"></span>

          <div className="-mt-2">
            <time className="text-xs/none font-medium text-gray-700 dark:text-gray-200">
              24/04/2025
            </time>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Launch
            </h3>

            <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              officiis tempora ipsum adipisci tenetur sunt quae exercitationem
              sed pariatur porro!
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>
    </ol>
  );
}

export default Timeline