# todoList
todo리스트

# api
* ~~(post) localhost:port/todo 할일 추가하기~~
    * 요청

    |body| 예 |
    |---|---|
    |comment|안녕|
    |day|2022-01-17|

* ~~(put) localhost:port/todo/:id 할일 수정하기~~
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


* ~~(get) localhost:port/todo/all/:day 해당 날짜의 할일 모두 가져오기~~

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

---------------------------------------------------------------------------------
2022-01-19 추가
* 바뀐 것들
    * day 부분이 원래 2022-01-19 형식이었는데 밑 형식으로 변경

            {
                "year" : "2022",
                "month": "1",
                "day" : "19"
            }
    
    * (get) localhost:port/todo/all?year=2022&month=1&day=19 해당 날짜의 할일 모두 가져오기
        * day부분 수정 및 쿼리로 데이터를 받음

    * (post) localhost:port/todo 할일 추가하기
        * 요청 형식 변경

        |body| 예 |
        |---|---|
        |comment|안녕|
        |year|2022|
        |month|1|
        |day|19|

    * (put) localhost:port/todo/:id 할일 수정하기
        * 요청 형식 변경
    
        |body|예|
        |---|---|
        |comment|안녕|
        |year|2022|
        |month|1|
        |day|19|



* 기본 응답(응답이 안 쓰여져 있는 것들, 기존 위에 있는 api 응답데이터가 밑에 있는 data에 들어감)
    * 응답이 안쓰여져 있는 것들

            {
                "success": true,
                "status": 200,
                "message": "OK",
                "data": {
                }
            }
    * 기존 위에 있는 api 응답 데이터가 data 필드에 들어감

            {
                "success": true,
                "status": 200,
                "message": "OK",
                "data": {
                    여기에 들어감
                }
            }


* 에러 기본 응답(status와 message만 변경)

            {
                "success": false,
                "status": 400,
                "message": "비밀번호를 찾을 수 없습니다.",
                "data": {
                }
            }


* (post) localhost:port/auth/signup 회원가입하기
    * 요청

            {
                "eamil": "wnstjd4778",
                "password": "11111",
                "tel": "01011111111",
                "nickName": "안녕"
            }

* (post) localhost:port/auth/signin 로그인 하기
    * 요청

            {
                "eamil": "wnstjd4778",
                "password": "11111"
            }
    
    * 응답

            {
                "success": true,
                "status": 200,
                "message": "OK",
                "data": {
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoid25zdGo3NyIsImlhdCI6MTY0MjU5NjIyOCwiZXhwIjoxNjQyNTk5ODI4fQ.G5Vcx6U8qdg_jjyDw9l32hxiKjWC0GxnAvbKuzM-mGQ"
                }
            }

    * 토큰을 받으면 매 요청의 헤더에 authorization 필드에 값을 토큰 값을 넣어서 보내면 로그인이 됩니다. 
* (post) localhost:port/auth/signup/checkEmail 중복 이메일 체크하기
    * 요청

            {
                "eamil": "wnstjd4778"
            }
* (post) localhost:port/auth/signup/checkTel 중복 전화번호 체크하기
    * 요청

            {
                "tel": "01011111111"
            }
* (post) localhost:port/auth/signup/checkNickName 중복 닉네임 체크하기
    * 요청

            {
                "nickName": "안녕"
            }
* (get) localhost:port/auth/myProfile 내정보 확인하기
    * 응답

            {
                "success": true,
                "status": 200,
                "message": "OK",
                "data": {
                    "_id": "61e63114430de00870719e38",
                    "email": "wnstjd4778",
                    "password": "$2b$12$SF7ZEe6.Iq1.I1jOeng7SOL9qcbf9613YjZ1v0Gp8CCarDa73TlGO",
                    "nickName": "dsdx",
                    "tel": "01065614771",
                    "__v": 0
                }
            }
* (post) localhost:port/auth/change/password 비밀번호가 맞는지 변경하기
    * 요청

            {
                "oldPassword": "11111",
                "newPassword": "22222"
            }
* (post) localhost:port/auth/change/nickName 닉네임 변경하기
    * 요청

            {
                "nickName": "안녕하세요"
            }

* (post) localhost:port/auth/find/password 비밀번호 찾기
    * 요청

            {
                "email" : "wnstjd4778",
                "tel" : "01011111111"
            }

    * 응답

            {
                "success": true,
                "status": 200,
                "message": "OK",
                "data": {
                    "password": "11111"
                }
            }

* (post) localhost:port/auth/find/email 전화번호로 이메일 찾기
    * 요청

            {
                "tel" : "01011111111"
            }

    * 응답

            {
                "success": true,
                "status": 200,
                "message": "OK",
                "data": {
                    "email": "wnstjd4778"
                }
            }




    







