import dbConnect from "../../../utils/dbConnect";
import Student from "../../../models/Student";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const student = await Student.findById(id);

        if (!student) {
          return res.status(400).json({ success: false });
        }

        return res.status(200).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
      }
      break;
    case "PUT":
      try {
        const student = await Student.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!student) {
          return res.status(400).json({ success: false });
          console.log(error);
        }
        return res.status(200).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false });
      }
    case "DELETE":
      try {
        const deletedStudent = await Student.deleteOne({ _id: id });

        if (!deletedStudent) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, date: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
