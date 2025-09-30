export default function parseErr(err, columns)
{
    let errMsg = err.message;
    if(errMsg.endsWith("cannot be null"))
    {
      let errColName = errMsg.split("'")[1];

      if(columns)
      {
        const col = columns.find((column) => column.id === errColName);
        if(col)
        {
          errMsg = `Please provide value for ${col.err ? col.err : col.label}`;
        }
      }
    }
    return errMsg;
}