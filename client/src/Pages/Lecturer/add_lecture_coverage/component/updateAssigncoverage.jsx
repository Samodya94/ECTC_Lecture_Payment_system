import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Service from "../../../../utilities/Service";

export const UpdateAssigncoverage = () => {
  const [batchCode, setBatchCode] = useState("");
  const [duration, setDuratuion] = useState();
  const [remHours, setRemHours] = useState();
  const [updateremHours, setUpdateremHours] = useState();
  const [status, setStatus] = useState();

  const { id } = useParams();
  const service = new Service();
  const navigate = useNavigate();

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    getAssignedBatches();
  }, [batchCode]);

  useEffect(() => {
    setremHours();
  }, [remHours]);

  useEffect(() => {
    viewupdatedHours();
  }, [updateremHours]);

  useEffect(() => {}, []);

  const setremHours = () => {
    const ms = parseInt(remHours, 10) + parseInt(duration, 10);
    setUpdateremHours(ms);
    console.log(remHours);
    console.log(ms);
  };

  const viewupdatedHours = () => {
    console.log(updateremHours);
    updateAssignBatch();
  };

  const getId = () => {
    const responese = service.get(`coverage/${id}`);
    responese.then((res) => {
      setBatchCode(res.data.batchCode);
      setDuratuion(res.data.duration);
    });
  };

  const getAssignedBatches = () => {
    const responese = service.get("assignbatch/assigncode", batchCode);
    responese.then((res) => {
      console.log(res.data);
      setRemHours(res.data.remaining_hours);
    });
  };

  const updateAssignBatch = () => {
    const data = {
      remaining_hours: updateremHours,
    };
    const response = service.put("assignbatch/bcode", batchCode, data);
    response
      .then(() => {
        console.log("updated");
        setStatus("Updated");
      })
      .catch((error) => {
        console.log(error);
      });

    if (status === "Updated") {
      navigate("../add_coverage");

      const response = service.delete("coverage", id);
      response
        .then(() => {
          alert("Record Deleted successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return <div></div>;
};
