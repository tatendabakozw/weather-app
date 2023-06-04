const getMessage = (err: {
    response: { data: { message: any } };
    message: any;
  }) => {
    return err.response && err.response.data && err.response.data.message
      ? err.response.data.message
      : err.message;
  };
  
  export { getMessage };
  