//console.log("get prod details ");

module.exports = function getProdDetails(defaultPort) {
  const isInProduction = Boolean(process.env.PORT);
  const PORT = process.env.PORT || defaultPort;
  return [PORT, isInProduction];
};
