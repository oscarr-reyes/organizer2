set host="127.0.0.1"
set db="organizer"
set user="root"
set password="3141"
set config="./configModels.json"
set output="./models"

sequelize-auto -h %host% -d %db% -u %user% -x %password% -c %config% -o %output%