# 좋아요 누를 때 화면 먼저 바뀌고 데이터를 보내는 방식으로 하자 [ ]

# 처음 들어갈 때 이미지 로딩 너무 느림 수정하자 [ ]

background: linear-gradient(
to right,
#9b89ff,
#d4dfff,
#b065f9,
#e5d4fa,
#fdb0b9,
#f58afe,
#edacf6,
#9e70fe
);
background-size: 400% 400%;
animation: animate-bakground 10s infinite ease-in-out;
@keyframes animate-bakground {
0% {
background-position: 0 50%;
}
50% {
background-position: 100% 50%;
}
100% {
background-color: 0 50%;
}
}
