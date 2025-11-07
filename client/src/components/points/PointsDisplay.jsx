import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPoints } from "../../redux/features/pointsSlice";

export default function PointsDisplay() {
  const dispatch = useDispatch();
  const { points, level, badges, loading } = useSelector(
    (state) => state.points
  );

  useEffect(() => {
    if (loading) return;
    dispatch(fetchUserPoints());
  }, [dispatch]);

  return (
    <div>
      <h2>Your Points</h2>
      <p>Points: {points}</p>
      <p>Level: {level}</p>
      <p>Badges: {badges.map((b) => b.name).join(", ")}</p>
    </div>
  );
}
