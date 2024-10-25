import { Dot } from "lucide-react";

const HowToDonate = () => {
  return (
    <div>
      <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
        Guidelines on Safe Food Sharing
      </h3>
      <p>
        Sharing food through our platform is a powerful way to help reduce waste
        and support those in need. To ensure a seamless and safe experience,
        we’ve made the process of donating food simple and straightforward.
        Below is a step-by-step guide on how to fill out the food donation form
        and the importance of safe food sharing.
      </p>
      <ul className="space-y-3 ml-1 mt-3">
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Food Name:</strong> Begin by providing a clear and accurate
            name for the food you are donating.
          </span>
        </li>
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Food Image:</strong> Upload a clear image of the food. This
            helps potential recipients know exactly what you’re offering.
          </span>
        </li>
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Food Quantity:</strong> Specify the quantity of food you are
            donating.
          </span>
        </li>
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Location:</strong> nter your exact location where the food
            is available for pickup.
          </span>
        </li>
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Available Time:</strong> Specify when the food will be
            available for pickup.
          </span>
        </li>
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Message (Optional):</strong> You can include any special
            instructions or messages in this section.
          </span>
        </li>
      </ul>
      <h3 className="text-2xl sm:text-3xl font-semibold mt-3">
        Tips for Safe Food Sharing
      </h3>
      <ul className="space-y-3 ml-1 mt-3">
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Hygiene:</strong> Ensure that all food is stored and handled
            in a clean environment before donation.
          </span>
        </li>
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Packaging:</strong> Store food in sealed, clean containers
            to maintain freshness and prevent contamination.
          </span>
        </li>
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Freshness:</strong> Only donate food that is still safe to
            eat. Check that the food has not expired or spoiled.
          </span>
        </li>
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Allergen Information:</strong> EAlways provide accurate
            information regarding potential allergens in the food you are
            donating.
          </span>
        </li>
        <li className="flex items-center">
          <Dot />
          <span>
            <strong>Timely Pickup:</strong> Ensure the food is picked up within
            the specified time window to maintain its safety and quality.
          </span>
        </li>
      </ul>
      <p className="mt-3">
        By following these simple guidelines, you can make a big difference in
        someone’s life while helping reduce food waste. Thank you for being part
        of this important mission!
      </p>
    </div>
  );
};

export default HowToDonate;
