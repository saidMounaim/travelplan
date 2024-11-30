import CreateTripForm from "@/components/shared/forms/CreateTripForm";
import React from "react";

const CreateTripPage = () => {
  return (
    <div className="flex-1 py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-orange-600">
            Create Your Trip
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Plan your perfect getaway. Fill in the details below and let our AI
            do the rest.
          </p>
        </div>
        <CreateTripForm />
      </div>
    </div>
  );
};

export default CreateTripPage;
