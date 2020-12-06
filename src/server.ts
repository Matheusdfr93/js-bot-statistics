import createApp from "./app";

const app = createApp();
const PORT = process.env.PORT || 5556;

app.init();

app.express.listen(PORT, () => {
  console.log(`listen on PORT: `, PORT);
});
