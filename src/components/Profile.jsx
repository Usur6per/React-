import HumanImg from './image/Human.jpg';

const Profile = () => {
    return (
        <div>
            <div className="d-flex bg-light justify-content-center mt-3">
                <img style={{ width: '450px', height: '500px' }} src={HumanImg} alt="Profile" />
            </div>
            <div className="text-center" >
                <h1 className="text-black">ชื่อ อินทัช ชายเพ็ชร 67173986 อายุ 21</h1>
                <h1 className="text-black">มหาวิทยาลัยศรีปทุม คณะเทคโนโลยีสารสนเทศ สาขาวิทยาการคอมพิวเตอร์ ชั้นปีที่ 2</h1>
            </div>
        </div>

    );
}

export default Profile;