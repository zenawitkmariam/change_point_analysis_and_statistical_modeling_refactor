import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function EventTimeline({ events }) {
  return (
    // <div style={{ marginTop: "30px" }}>
    //   <h2>Key Oil Market Events</h2>

    //   {events.length === 0 ? (
    //     <p>No events available</p>
    //   ) : (
    //     <ul style={{ listStyle: "none", padding: 0 }}>
    //       {events.map((event, index) => (
    //         <li
    //           key={index}
    //           style={{
    //             marginBottom: "15px",
    //             padding: "10px",
    //             borderLeft: "4px solid #f59e0b",
    //             background: "#fef3c7",
    //           }}
    //         >
    //           <strong>{event.Date}</strong> — <strong>{event.Event}</strong>
    //           <br />
    //           <em>{event.Category}</em>
    //           <br />
    //           <span>{event.Description}</span>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.Date}</TableCell>
              <TableCell>{row.Category}</TableCell>
              <TableCell>{row.Description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
