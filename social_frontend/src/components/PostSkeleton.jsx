import React from 'react';
import styles from './PostSkeleton.module.css';

const PostSkeleton = () => {
    return (
        <div className={styles.postSkeleton}>
            <div className={styles.skeletonHeader}>
                <div className={styles.skeletonAvatar}></div>
                <div className={`${styles.skeletonText} ${styles.skeletonName}`}></div>
            </div>
            <div className={`${styles.skeletonText} ${styles.skeletonContent}`}></div>
            <div className={`${styles.skeletonText} ${styles.skeletonContent} ${styles.short}`}></div>
            <div className={styles.skeletonActions}>
                <div className={styles.skeletonButton}></div>
                <div className={styles.skeletonButton}></div>
                <div className={styles.skeletonButton}></div>
            </div>
        </div>
    );
};

export default PostSkeleton;
