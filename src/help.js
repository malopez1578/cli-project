var figlet = require('figlet');

export async function helperCli() {
  await figlet.text(
    'Help',
    {
      font: 'Ghost',
      horizontalLayout: 'universal smushing',
      verticalLayout: 'universal smushing',
    },
    function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(data);
      console.log(`

Commands:

game <option>                                                Start a build of a game


Options:

--help  Show help                                            [boolean]
--new Init compile game                                      [boolean]
      --template Select template of game                     [Typescript, Javascript]
--start Init compile game                                    [boolean]
      --port Config port live server                         [boolean]
--build Compile final version of the game                    [boolean]
`);
    }
  );
}
