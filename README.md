# todoList
todo리스트

# api
* (post) localhost:port/todo 할일 추가하기
    * 요청

    |body| 예 |
    |---|---|
    |comment|안녕|
    |day|2022-01-17|

* (put) localhost:port/todo/:id 할일 수정하기
    * 요청
    
    |body|예|
    |---|---|
    |comment|안녕|
    |day|2022-01-22|

* (delete) localhost:port/todo/:id 할일 삭제하기



* (get) localhost:port/todo 할일 모두 가져오기
     * 응답 예

            {
                "_id": "61e50a06f36a833ea9ce9ec2",
                "comment": "111",
                "important": false,
                "completed": false,
                "day": "2022-01-17",
                "__v": 0
            },
            {
                "_id": "61e50a0af36a833ea9ce9ec6",
                "comment": "11111",
                "important": false,
                "completed": false,
                "day": "2022-01-17",
                "__v": 0
            }



* (get) localhost:port/todo/today 오늘 할일 가져오기
    * 응답 예

            {
                "_id": "61e50a06f36a833ea9ce9ec2",
                "comment": "111",
                "important": false,
                "completed": false,
                "day": "2022-01-17",
                "__v": 0
            },
            {
                "_id": "61e50a0af36a833ea9ce9ec6",
                "comment": "11111",
                "important": false,
                "completed": false,
                "day": "2022-01-17",
                "__v": 0
            }


* (get) localhost:port/todo/important/:id 할일 중요 체크하기 (true면 false, false면 true)


* (get) localhost:port/todo/completed/:id 할일 끝냈는지 체크하기 (true면 false, false면 true)

* (get) localhost:port/todo/important 중요체크한 할일 모두 가져오기

    * 응답 예

            {
                "_id": "61e50a06f36a833ea9ce9ec2",
                "comment": "111",
                "important": true,
                "completed": false,
                "day": "2022-01-17",
                "__v": 0
            },
            {
                "_id": "61e50a0af36a833ea9ce9ec6",
                "comment": "11111",
                "important": true,
                "completed": false,
                "day": "2022-01-17",
                "__v": 0
            }

* (get) localhost:port/todo/all/:day 해당 날짜의 할일 모두 가져오기

    * 응답 예

            {
                "_id": "61e50a06f36a833ea9ce9ec2",
                "comment": "111",
                "important": false,
                "completed": false,
                "day": "2022-01-18",
                "__v": 0
            },
            {
                "_id": "61e50a0af36a833ea9ce9ec6",
                "comment": "11111",
                "important": false,
                "completed": false,
                "day": "2022-01-18",
                "__v": 0
            }






    







