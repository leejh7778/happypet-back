import requests
from sys import argv
from dotenv import load_dotenv
import os

# .env 파일에서 환경 변수 로드
load_dotenv()

# API 키와 API URL 설정
# https://manage.exchangeratesapi.io/
CURRENCY_API_KEY = os.getenv('CURRENCY_API_KEY')  # .env 파일에서 API 키 가져오기
BASE_URL = 'https://open.er-api.com/v6/latest/'

def parse_arguments():
    amount = 1.0  # 기본 금액
    try:
        amount = float(argv[1])  # 사용자가 입력한 금액
        del argv[1]  # 인자에서 금액 제거
    except ValueError:
        # 금액이 입력되지 않은 경우
        pass

    # argv 구조: [0] - program name, [1] - SRC, [2] - 'to', [3] - DST
    if len(argv) != 4 or argv[2] != 'to':
        raise Exception("Usage: [<amount>] <BASE> to <DESTINATION>")

    return amount, argv[1].upper(), argv[3].upper()

# main
usage = '[<amount>] <BASE> to <DESTINATION>'
try:
    amount, base, dest = parse_arguments()
except Exception as e:
    print(e)
    print('Usage:', usage)
    exit(1)

# 환율 변환
try:
    # 환율 API 호출
    response = requests.get(BASE_URL + base)
    if response.status_code != 200:
        raise Exception("Failed to fetch data from API.")

    data = response.json()
    rates = data['rates']

    # 목적 통화가 유효한지 확인
    if dest not in rates:
        raise Exception(f'Currency {dest} is invalid.')

    # 환율 계산
    result = rates[dest] * amount
    result = round(result, 3)

    # 출력하기 전에 \n을 제거
    print(f'{amount} {base} equals to {result} {dest}'.strip())

except Exception as e:
    print(f"Error: {e}")
    exit(1)
