import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';

import { Badge } from '@mui/material';

export function Counter() {
  const [like, setLike] = useState(0);
  const [dislike, setDisLike] = useState(0);

  
  useEffect(()=>{
      console.log("like is updated",like);
     },[like]);
  return (
    <div className="counter-container">
      <IconButton aria-label="delete" color="primary" className="likes-dislikes" onClick={() => { setLike(like + 1); }}><Badge badgeContent={like} color="primary">👍</Badge></IconButton>
      <IconButton aria-label="delete" color="error" className="likes-dislikes" onClick={() => { setDisLike(dislike + 1); }}><Badge badgeContent={dislike} color="error">👎</Badge></IconButton>
    </div>

  );
}