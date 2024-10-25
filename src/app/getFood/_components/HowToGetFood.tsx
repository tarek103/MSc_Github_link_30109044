import { Dot } from "lucide-react";

const HowToGetFood = () => {
  return (
    <div>
      <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
        How to Get the Food
      </h3>
      <p>
        Our platform makes it easy for individuals in need to access surplus
        food from generous donors. If you’ve found food you would like to
        receive, follow the simple steps outlined below to request and safely
        pick up the food. The form allows you to provide necessary information,
        and you will be guided to the location where the food is available.
      </p>
      <h6 className="text-xl font-semibold my-4">
        <strong>Step 1:</strong> Fill Out the Request Form
      </h6>
      <ul className="space-y-3 ml-1 mt-3">
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Name:</strong> Enter your full name to identify yourself as
            the person requesting the food.
          </span>
        </li>
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Your Address:</strong> Provide your current address.
          </span>
        </li>
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Message (Optional):</strong> In this section, you can leave
            a message for the donor.
          </span>
        </li>
      </ul>
      <h6 className="text-xl font-semibold my-4">
        <strong>Step 2:</strong> Review the Food Location
      </h6>
      <ul className="space-y-3 ml-1 mt-3">
        <li className="flex items-center">
          <span>
            Once your request has been submitted, the platform will show you the
            location of the food. This is the address provided by the donor, and
            it’s where you will need to go to collect your food. The map or
            address details will be available to guide you.
          </span>
        </li>
        <li className="flex items-center">
          <span>
            Make sure to review the location carefully and check the distance
            from your current address. It’s important to pick up the food as
            soon as possible to ensure it remains fresh.
          </span>
        </li>
      </ul>
      <h6 className="text-xl font-semibold my-4">
        <strong>Step 3:</strong> Step 4: Collect the Food
      </h6>
      <ul className="space-y-3 ml-1 mt-3">
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Be Courteous:</strong> Thank the donor for their
            contribution. If the pickup is contactless.
          </span>
        </li>
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Check the Food:</strong> Ensure that the food matches the
            description provided on the platform
          </span>
        </li>
      </ul>
      <p className="mt-3">
        Once you’ve collected the food, make sure to store it properly and
        consume it safely. If you’ve collected more than you need, consider
        sharing it with others in your community or neighborhood who may benefit
        as well.
      </p>
      <p className="mt-3">
        By following these steps, you can access surplus food quickly and
        safely, helping to reduce waste and support the community.
      </p>
    </div>
  );
};

export default HowToGetFood;
