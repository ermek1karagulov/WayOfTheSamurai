import React from "react";
import "./ProfileInfo.css";

const ProfileInfo = () => {
  return (
    <div className="item">
      <img
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFRUYGBgaGBUYGBgYGBgYGBgYGBgZGhgYGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHDQkISE0NDE0NDQxNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0ND8/NEA0ND8/NDQ0QDU/NDE0Mf/AABEIALUBFgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQADBgIBB//EADoQAAIBAwIEBAQFAgUEAwAAAAECAAMEESExBRJBUQYiYXEygZGxE0KhwdEUUiNyguHwJGKy8TNTkv/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwAEBf/EACERAAMBAAIDAQADAQAAAAAAAAABAhEhMQMSQSITMlEE/9oADAMBAAIRAxEAPwD58yzhxCaiSpxpHFRWDIZwDO8QMU9EpqmXSl1zEp4NK1ldPeXu5nKpiRppbYalIqYyBzCqVAbmeOgzpKORU0VoxhFIZh1vw8MIXR4GxPlmqGjKpYqrJiDYmqufDVQJzYmbr0SpwRBnBmVAT1p6BOWimKmnSCcsJZTEczCKQhKDMpRYTSWJ2A75MT2R3A1JwJUldSQAdT7yi4MWEST3HmKgEkDJwCcD100khAc5kM6M5M2GIJ7JOCYMMXo0jNKVaeuYtIKK6ydoA41jEHMEuEiIJZRbSRxKaLS9pmYpIknrSQmCqogVSH1VgVVYzMmCDeWyvGssmZjkmRRINYQiaSVPSsTnJQwkoU8tiSrOFrFTHngWuQ67TlEAt3807rVyw1gtJtZR1rRLB/SrkbRvw7ixUjMz1u8Pp0wdpfsn0fRbPi6VE5SOnpMf4n4eAxZRL+E0yGGsacfoZp59IlSsDNPT52ZWZbWGCZTIoqc4l9JJUm8vqvyoT9PcwUzI8q3Sodck9hK24ix0UBR3Op+UWscnJ3llKprFCki2oWfVmz2kpEqVbrg4951kE6a5ltOyqOcBDrt/MKTYW0g7wteOjsEJ5n5Rk7YGpzNXccPSoSxcI/YLhD6xZwPhopHJ1cjX09IbcXBzhfrvOzx+FevPZxeTzv2/PQHX4PVX4QHHdDn9IA6kHBBBG4IwfpGlmWDaE6n2mssPwKqmlXUNoMMcc4z2beLfj9eh48vt2fPZyRNN4j8KvQH4tM89I9ceZM7c47eszclpZnOJ6ZMSLFa4AV7GeVlyJ3WWVq2RJtDJgIODCkORB7hZ3RaEJYRJPDPZjaHVRpAKojFxAaixmCQFxPVnVVJzTi0+BpWsvpU5a64E9RgJVWqSS5ZeuEUuYKDrCXi+q2ssjnGSoCIER5oRaPpK3XzR2jLgsDkQi2ujmVIoMgGDmOhHjNhwpmxmX8R4kShWL+B3Yxgw7iVBeUtDXQq7MlcHJMHhFXeUlZIoe01nF82gWEIIFy89Uds9fSKlrD0tHFnZJgZTPfMMXgtFz0XOw2nFFDnQ/rDqdJp6H8c50efV1vZ7Z+HkRubVv20mgFBQmFxt9tYst2ddwf2jSiOYE5m9EuhXbfbAWp4Qv1Ogg9C2GOZvlnp6xrVTyAb6iVVaWSEGneFMUTXBz8II9pTSeorcw5vntG9wqpooyfSCIKgcHPIMjJOwHUlfze0PY0s23hDiPOhR8HpynXynv3HSZnxv4Y/p2/GpD/CY6j/62PT/ACnp9O0O4bVRKqueRCdA9M/4VUdRg/A/p1m1evTrU2RxzKylWB6gjAI/mcnknKO2K1Hw+QQ3jHDzQrPTOoB8rYxzKdjA1ERjErDSBg6zRWtoP6etUbGiqqe7OuT9P/ITOVRgxXOBTPLhZTSlxOYPsYuDBAM9nIkmww1qLBHWaLiVmBqIkdYZapaZpzwLrhMz22tSYaKWZfTOBGUauSbvOhTcUysGzCr+rkwOJ6pMr7Nrk9qNpAKphNRoK8AUgi1fAnY1MpthCUWVzULpahnZnMFd2B0mbwWVrHvDPKYdf3vlxmZ+yrMd5fXqZi+3BnKTOczpEnCy6mIjYx440gdgmag/1Rki6E+hgNgPO3u2PrKeJfpCU/yxwlufSMbamw2+8WIjA6Z1jO15gdTr2Gpnoo4KGtJm/OMDvCaY5TpsdvSVUC2NU+ss5umntrEYpcAOvQgyuq2564wJ1yneeMhbTpn6wGBHbkHlGX/uOy9/eK6lJ3y2hH97nC/6R1jd0XBd9EXp3x39Jh/EviE1G5KRIXXONM9gPSCrUop4vG6Yzo3iKxQujKT5guQPQjOmR33m74TxPQFjnbGnxdmnxehYVW8w0666Zmz8J8RbH4b6FRp3OMZ99PtJa67R0+qnpmr8e2isi1VGqnBPdW2/X7zGWtPmb0Gpm7rMK1s4J3Uj5gHH2ExlsOVM9SZNTj5+DbuL/RrWz/TVcaKiIm27PUBP/j+kyddZqbhT/SP2NSmD8w5/aZ11yJPW+S1JS8XwAldQQh0xK3GkwqOaJ0kgxq4kihNo99zLgxVVbWVVrkAQJbrJjKVLwDp0tHNIDEqu3AWUi4GN4FeXOdJR0swjMtvkEqPkzhzPCZTUaSZdI8ZtZU4nhaSIOiy3aGo4i1Zcjyk2votQ/geDDrUId4nFWEW9TWFtMVJoeXFuirkRMx1l9xdZGMwYGLRi5ZdTMELnpPFdvWJ6thwZ1F8hx/zWKrZ8OehyfpDaNYkYIgyJmqfTm/iWlZglfRrbVGOxPbT7CMLZ3JwCR6IoP1J6xelyEQsdOg765zj1wIAPEhGnIOXsCf1Od52PyTPZyfx1T4Nlbl/7n+eP2EPpoTuT9ZjbXxSgOtM//rb21mpsOLpUGU7DOu3of1g91XQleOp7GLUxie03EHNbPznudd8/LTaHGAzPi/iZKfgJ+bGSOo0P3iXhvCQuC4y5wdRnkB2GOrHtHV3bKtYuRkbj5dBH/h9ORGuMAuXCKSM8jMcMwB9sfISXkyF7M6fHtfmRK/C7kLzLbVCB1ICk/wCk6/oIBb1wWwMq6n4Tofb7zY8O8TfiNU5VrKaTAP8AiHKOCcHC/lOhIxEPjW1X+pD09NsgfmOddvSS8P8A0PyNrB78Klboz4U7P0OCDt0IG0WVkyPKNAf0xGPhy6ZHUHGCcEep0E7ZOS4qUz35gDpoeg+su1uomqzGvhTduBauvUvRIz/rmeA0jbjrkEJjByCe4xkY/UxUJzUki0065YJXEArviMLkgCIbmrkxGUS0pqvkyTiSIONbl8QdHjLitADaApT0hda9CpxYWlziDZMvYSp8TaBzhw7YgztmWhSx0ly2mNTGxsXUgLlnuIS6Qd4rWBTTOQZ2gnEIVNIrKrkqhdqhMGVYx4XjnGe8wqWs5qUyOk8UT6NZ+H0rJkDWI+LeFnp6qNJRconSxgvDeFBk5oNWoKrYjC3ptyAHKkdQcfWUXFmx1B5vv/vLSkiT9mULQGNIssv/AJHPv94zV+mxHSAWigVHHt+uszX6QE/yzni48g/zCG2fB6QRecZYgE5OgzJVt+cAH+4GE8Nofj3ApEkKMl+7Afl9pR4nrE5eJFA4IjkhPN/kVmx74zLrW2ahsT6jGD9DrNbxziv9MpVKbFECDkpeQsWAJZiNca4nVOolZCKgOqI6c/xpzboW67jf1kJ/6F7ZhSvC/XlgFrch1BXXJ1z0jCmNJnk/wKvITlWwQe2e8e21QEfvO3tajhpY8FvFaeWBXqMaY09s9YYt7+FT/CGWUgaADy428w/NsZTfpzDAntrW8uGGTtnSCpVLGNNuVwdPxIuPMpBwAMAnbbO2ZSKTOSQhyfzPr9B0EYgJtkg+uhnX4Wnx/aLPjmP6rDV5KrtgdF1p5K4Zl5WI7hT29O4ORDvEIzVp3I2emrb9gMge4i+8tF+JW16HSX1qvNb0Tp5GdNO/MTgfLE1LlMeHstMA8T1A7o4GA1MAkdWQlW+eg+oiY6DMeeIX5nRAABTRdv7n8z59cmIb1uVZy12zojpCq+rZid9TDLh4IRJMsjkyT0LJNgwzr1S288WV0myJaBiKi1IjJiUrRLGFU6BYwvkCaSkTvJCqzo5trUAbayytanEJt2G5kqXWTpLepF0LnsTjMUXCYJmpa5HLgzN3xBYxLngPjrWDImsMC6YntlSJ6RxbWIac1cHZCTQqShpCeH0TziaKjwQH/wBRnZcBAIP7RHQ68ePTWeEqXkE0Va3RhhhFHBk5ABGd1WwuZ0ePlHL5XlCDiXAUIJWYi9sXoud+XP0mvueKkNrtPLkpVQ7ZxLOWQm0npha1ENv9esS0F5az9sgZ+2Y9vHCPyNproehi20pA1qynriaf7JFLactl2JRbFkr86kg9x/HXSc0qzAlCMspxnuOmflDKJY9J0+qfDOb29eTRU+MBwGKuHAKlxhcj/uDaH3gz1S55U+EYyen16mU21nzaudN8bD/eMkYKvkAHaKvDEvUuSd+aq40VcRoADXcawngZ5vL3g1+4BVM5J1PqfWeWNVqZJXUZzHqlP00xVLo1q8KBHrEt/bKjleYd9Pcwg8ewvlU836Z9ZlOI1Hd+TJGdWI3OeknNPSn8WLXwNaXEDrpzqCR3PuIbTuEdfKdP1zEtogRcDfHWVPWw2V0PXGx95XV9IuP8G14mnlPQyvhhISoh7o6jcZVsH9D+kBeqxGV26iMvDxVy4O4puR9P9onk4XA/in/SuqpJZ21JJJ9zMzxWtlsCam/bCmZylw5qjkzkes6ZElwmBK0p5Ec3/DXztBaVHl3i+uso3gMtCSGGSP6oXWcXVmUM4Q5M03GrcMCRMumQ0Soyh48uyNkcIsFNTJzKqtTM4Qys8Eqehhq4E8pP1g7GFUdpRciUVVWiy5XWOHQQC5pRLXA0PBh4dCk4MfVLEocrtMxwV+VxN7QwyjPaIoVTjC7c1qOuHvpHdsBETUmXVZSeIupxOWvC1XB2z55c8n0SxQcsru0LaRXwC+LAZM0ZQEZE6JXqjkt+zMbxOwxrFls5U4mp4q4GhmWvGAOZ0y+DmpZ0KfFVqGTm6zL8FuwlRuc7gDJ6YPWa2/fnQj0mEVcVGHvJ1+a0tP6nGP8AiSKKoZfzDOf2J9jLUrge/QQKxuhnkc6YIGf5krLyvjJPb2Msmn+ieZ+WNrS6YlU6E7/zG7OMegiC2q8mphDXHk9T+8qnpzVHIv4rQNTzcxByTj0iinaOpyGI9iR9o4uKuBrKQwOcZHaTpJs6IblF9nc1DhCMkfmPb1jFbQjzncwK3rqupZR7kSm/8QU1GOfnI/Ko0/iZKJ50Z+98BlwwXJz7+nziSndh38ucA6np7RbcX9aueUeVew9+pj3hFhyJtrue8VV7PhcBc+s8vkcW1PT0wx/SEeGyFrPzbfhPjXHp895xbJ5HJ0ITT1yQMTvh6DkPnAeoyoMb8upYemwhvrBYQv4lcktyiW21Q00ziJritipn1hl1fAqBIJlcC0vgwJImfuqmWOIbUcBNIpbebDadl5JxJMY2PEfhmNuGw81N1VyhmPu6nmmvsHi6LzOlnFM5E7WbQtEU6wpXg2Jw9TEKeAzQt6krYZEqovmGomkzemzASyGHE3vD3yomIVMNNNw+4wIFwC+jV2yAxfxqiF1AndpdT3iTcyGMIingt7jSbSyu8jE+X2dbkf5zZ8KvM4itaHWgnxG+ELT56/FOYlcze+IzmkfafIKgYOfczKmhlOmrtnDA5mUqri4ZfVvtHFhUaK7kf9T7kfaGnuBhdo7elrKbuo6FGByOx2PeMqlOL+M/AnuftFrhcBXIUl0HAOw+xjKiB8B67GZG1uuRtfhJ1/maihUV1Gum4Mr4vJqJ+SMZbxKx5lyP03HeZi64e6/Cze2Tn/ea+3uObyNv/wA1E8qWoPSUqVQsU5MQvD2bcnPrGdhwBTq7H/Ljf5xybbB7y1KJxpp84q8S+lH5m+iqnaomgA0htspnotSBr9cb4hCJjGmBjODoTKLjog6b7CHwttWcannpqPTXJ+cVeH6v/U0mYDCuAe2Dvn6wm5YC2IO71c+3Kp+u8p4Yq868228n9KrpCjiNPlqN6MR9DpAmYsdpoPEVtyuT0bBB9wIBa01zrIuXpVUsA64IGJWiwviGOkDV4WA8aSU1Kmsk2mwdXdUcsy1c+aMqrnG8VnVpz+3sX9FPAxthpLkpSuiNIRTeZ0/gVM5yetbkwK4pEbxvS1g3EE0mVPeTOJ+AtBYfSMV03xC0rS6OdllXfMZWdWKGqZhNvVxB9A1qNbYV4dcuOWZW3uyIY16WGI6J4C1XAf5zQcKugMazJ3oYHMssrxgYoWj6Df1eamfafNa+BUPvNBdcXIpkZ6TGvXLOT6wU8HmdNLRAwMRHxBsXCnGNU1764jngyFtIB4pp8jpprjPvrM22tCkk8CKzxRxZvKvuftGYGTAuNoAi+5+0LX5YJ4oRMJZbXbJsTjqOnylbTjEgnj1HQ0maKlcBwGU6j6+0ZW94xG/uDMjZVeVhnY6H59Y658Hrn7zqi9RzXHI9SsG+L2jGmVA+L1maoXo2ORGVG/QDqf8AnaVVJkXLG4qL9dde/f7Su5qZ2GNDn/n1i2pxRPn7RbWvebOMgfqfnA6SDMv6MK1fnIA2XOPXP/qeityEfSAWrEztHy+TrAkMx/xJDUo56qAR3x1EyP4pzNvYOGTl3xp8pkeMcPNKqVx5T5l9j0+RzJ0mmPPKAq9TMoLTuqZwi5ijIqIzPYSKckwdObimQIs6zT8V5QpAmYPxSOYyvs65Yzov5f5ltKqM/CT7ayhEysvohh0B/SWmcJVWh9Cp2Rj7cv8AM9v0LITyMvvj9iZSlq7EFVVDnPMDr9AI24gv+H64jNJoT3xmRQ6wlFzBjvL0eJqHaZ2UkBM6WpJmI6SYyhtBdnVGdZoKNJCAQZlhCaN0y9ZSbQleNmpr2asvSA0eHDOkHpX5IxmOeFHM1WkaPG32J+PW/IkylufNNx4mTyzD8uDJ+3sx1PqsNbwN9RKfHdHH4b9wVx7a5g/Ba2CIb43waVJv+4jfbTtKN/kmuKBqa6L7D7Rfx0DkX3/aMm0C/wCUfaK+NNlV9z9pqfBpX6ETTkztxODIHQeYjWhVJUE66RWIdYnyn0Mp4uyfkXAVp0ngJnLTxSe06PVEU8LA8sR5SZ6hk3wOuQ9LrT4Z7R1OIMJbbnWPNPRKk1nCaoUSvxNT56fONSnX/tO4g1ooIz0nt9WwhXPMG00jUtROW9MnVUzhMiaG2sEdgp2MX8W4a1JyADyHBU9NdcZ76GRc5yWVaAGpJK6i98/KeQaxhhxfcxEvxSSSb7KLobUhpCKR1nkkvPRK+xxbDaE36/4Z9pJIa6JLsxNf4j7yI0kk5WdiC6c6EkkQc4c6wintJJGAXUG1mx4AJJIrAV+KaYxMPc0hJJKx0Trs6sHIMZ+JzzUaOf7mH1WSSU+Ml9Cr2mFwo2CqPoBEXFW8o9zJJM+gz2KXlR3kkkS56Ifwv83yM9klI7Qt/wBWFO2BtK0b0kknScx4w0nCGSSQrspIQTt74nn4hBGNJ5JMghS3bd+kIpuWOp64nkkfQYNbJcOD6iOq9uHXlbUHHy9RJJML9BLrwrSamCCV8w9eh9fSSSSKMf/Z"
        alt=""
      />
      <div className="descriptionBlock">ava + description</div>
    </div>
  );
};

export default ProfileInfo;
