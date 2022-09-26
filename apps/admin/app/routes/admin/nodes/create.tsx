import { ActionFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";
export const action: ActionFunction = async ({ request, context, params }) => {
  const data = Object.fromEntries(await request.formData());
  const name = data.name;

  console.log(data);
  const userId = await requireUserId(request);
  console.log("userId", userId);

  const weatherNodesPrisma = prisma.weatherNode;
  const weatherNodeCreated = await weatherNodesPrisma.create({
    data: {
      name: name.toString(),
      userId,
      owner: "W3ther",
      city: "College Park",
      country: "USA",
      lat: 33.753746,
      lon: -84.38633,
      timezone: "EST",
      isActive: true,
      type: "eagle",
    },
  });
  return redirect(`/admin/nodes/${weatherNodeCreated.id}`);
};

export default function Create() {
  const returnData = useActionData();
  return (
    <div className=" max-w-2xl h-screen   px-6 py-4 ">
      <Form id="createNodeForm" method="post">
        <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">
          Name
          <input
            name="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm my-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="angry_giraffe_279"
            required
          />
        </label>

        <div className="mb-6">
          <label
            htmlFor="collection"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
          >
            Collection
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
          >
            longitude
          </label>
          <input
            id="repeat-password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            // required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
          >
            Latitude
          </label>
          <input
            id="repeat-password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            // required
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              // required
            />
          </div>
          <label
            htmlFor="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </Form>
    </div>
  );
}
