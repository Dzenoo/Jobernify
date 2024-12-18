import React, { Fragment } from 'react';

import useMediaQuery from '@/hooks/defaults/useMediaQuery.hook';

import NewAlertForm from './forms/NewAlertForm';
import ReceiveJobAlertsForm from './forms/ReceiveJobAlertsForm';

import { Seeker } from '@/types';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Drawer } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

type SeekerAlertsProps = {
  alertsData: Pick<Seeker, 'alerts' | 'receiveJobAlerts'>;
};

const SeekerAlerts: React.FC<SeekerAlertsProps> = React.memo(
  ({ alertsData }) => {
    const isLarge = useMediaQuery('(min-width: 1280px)');
    const [isOpen, setIsOpen] = React.useState(false);

    const closeAlerts = () => setIsOpen(false);
    const openAlerts = () => setIsOpen(true);

    const { alerts, receiveJobAlerts } = alertsData;

    function areObjectKeysEmpty(obj: any) {
      if (obj == null || typeof obj !== 'object') {
        return true;
      }
      return !Object.values(obj).some((value) => value);
    }

    return (
      <Fragment>
        {isLarge && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <NewAlertForm
              alerts={alerts!}
              closeAlerts={closeAlerts}
              isDialog={true}
            />
          </Dialog>
        )}
        {!isLarge && (
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <NewAlertForm
              alerts={alerts!}
              closeAlerts={closeAlerts}
              isDialog={false}
            />
          </Drawer>
        )}
        <Card>
          <CardHeader className="flex flex-col gap-5">
            <div className="flex justify-between gap-3">
              <div className="flex flex-col gap-3">
                <div>
                  <h1 className="text-base-black">Job Alerts</h1>
                </div>
                <div>
                  <p className="text-initial-gray">
                    Receive alerts for job opportunities that match your
                    preferences
                  </p>
                </div>
              </div>
              {!areObjectKeysEmpty(alerts) && (
                <div>
                  <Button onClick={openAlerts} variant="default">
                    Edit Job Alerts
                  </Button>
                </div>
              )}
            </div>
            {!areObjectKeysEmpty(alerts) && (
              <div>
                <ReceiveJobAlertsForm receiveJobAlerts={receiveJobAlerts} />
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-0">
            {areObjectKeysEmpty(alerts) ? (
              <div className="text-center flex flex-col gap-[10px]">
                <div>
                  <h1 className="text-base-black">No alert generated</h1>
                </div>
                <div>
                  <p className="text-initial-gray">
                    Consider enabling alerts to help you find the best job and
                    opportunity.
                  </p>
                </div>
                <div>
                  <Button onClick={openAlerts} variant="default">
                    Add New Alert
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border border-gray-100 bg-white p-3 rounded-lg dark:bg-[#0d0d0d] flex justify-between gap-8 dark:border-[#3b3b3b] overflow-auto whitespace-nowrap">
                {Array.from([
                  {
                    id: '1',
                    title: 'Title',
                    data: alerts?.title,
                  },
                  {
                    id: '2',
                    title: 'Type',
                    data: alerts?.type,
                  },
                  {
                    id: '3',
                    title: 'Level',
                    data: alerts?.level,
                  },
                ]).map((alertsInfoData) => (
                  <div key={alertsInfoData.id} className="flex flex-col gap-3">
                    <div>
                      <h1 className="font-semibold">{alertsInfoData.title}</h1>
                    </div>
                    <div>
                      <p className="text-initial-gray">
                        {alertsInfoData?.data}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Fragment>
    );
  },
);

export default SeekerAlerts;
