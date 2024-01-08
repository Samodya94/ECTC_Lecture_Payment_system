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
    getId()
  }, [])
  useEffect(() => {
    getAssignedBatches();
    viewupdatedHours();
  }, [batchCode]);
  const viewupdatedHours = () => {

    updateAssignBatch();

  };

  const getAssignedBatches = () => {
    if (batchCode) {
      const responese = service.get("assignbatch/assigncode", batchCode);
      responese.then((res) => {
        console.log(res.data.remaining_hours);
        setRemHours(res.data.remaining_hours);
      });
    }
  };

  const getId = () => {
    const responese = service.get(`coverage/${id}`);
    responese.then((res) => {
      console.log(res.data.duration);
      setBatchCode(res.data.batchCode);
      setDuratuion(res.data.duration);
    });
  };


  const updateAssignBatch = () => {
    if (batchCode) {
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
        const response = service.delete("coverage", id);
        response
          .then(() => {
            alert("Record Deleted successfully");
            navigate("../add_coverage");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    //
  };

  return <div></div>;
};
